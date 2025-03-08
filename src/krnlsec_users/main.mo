import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor KrnlSecUsers {
    // Stable storage for user roles
    stable var userRolesEntries : [(Principal, Text)] = [];

    // In-memory HashMap for fast lookups
    private var userRoles : HashMap.HashMap<Principal, Text> = HashMap.HashMap(
        10, // Initial capacity
        Principal.equal,
        Principal.hash
    );

    // Restore HashMap from stable storage after an upgrade
    system func postupgrade() {
        userRoles := HashMap.fromIter<Principal, Text>(
            userRolesEntries.vals(),
            userRolesEntries.size(),
            Principal.equal,
            Principal.hash
        );
    };

    // Preserve data before an upgrade
    system func preupgrade() {
        userRolesEntries := Iter.toArray(userRoles.entries());
    };

    // Register a new user with a role
    public shared func registerUser(user: Principal, role: Text) : async Text {
        switch (userRoles.get(user)) {
            case (?_) { return "User already registered."; };
            case null {
                userRoles.put(user, role);
                return "User registered successfully.";
            };
        };
    };

    // Retrieve a user's role
    public query func getUserRole(user: Principal) : async ?Text {
        userRoles.get(user)
    };

    // Update a user's role
    public shared func updateUserRole(user: Principal, newRole: Text) : async Text {
        switch (userRoles.get(user)) {
            case (?_) {
                userRoles.put(user, newRole);
                return "User role updated successfully.";
            };
            case null {
                return "User not found.";
            };
        };
    };

    // Remove a user from the system
    public shared func deleteUser(user: Principal) : async Text {
        switch (userRoles.remove(user)) {
            case (?_) { return "User removed successfully."; };
            case null { return "User not found."; };
        };
    };

    // Retrieve all registered users and their roles
    public query func getAllUsers() : async [(Principal, Text)] {
        Iter.toArray(userRoles.entries())
    };
};
