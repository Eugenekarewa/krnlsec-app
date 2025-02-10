import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor KrnlSecUsers {
    private stable var userRolesEntries : [(Principal, Text)] = [];
    private var userRoles : HashMap.HashMap<Principal, Text> = HashMap.fromIter(userRolesEntries.vals(), 10, Principal.equal, Principal.hash);

    public func registerUser(user: Principal, role: Text) : async () {
        userRoles.put(user, role);
    };

    public query func getUserRole(user: Principal) : async ?Text {
        return userRoles.get(user);
    };

    system func preupgrade() {
        userRolesEntries := Iter.toArray(userRoles.entries());
    };

    system func postupgrade() {
        userRolesEntries := [];
    };
}