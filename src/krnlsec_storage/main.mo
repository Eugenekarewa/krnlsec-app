import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor KrnlSecStorage {
    // Stable HashMap for efficient storage and retrieval
    stable var stableReportsEntries : [(Text, Text)] = [];

    private var reports = HashMap.HashMap<Text, Text>(
        10, // Initial capacity
        Text.equal,
        Text.hash
    );

    // Restore data from stable storage on canister upgrade
    system func preupgrade() {
        stableReportsEntries := Iter.toArray(reports.entries());
    };

    system func postupgrade() {
        reports := HashMap.fromIter<Text, Text>(
            stableReportsEntries.vals(),
            stableReportsEntries.size(),
            Text.equal,
            Text.hash
        );
    };

    // Store an audit report
    public shared func storeReport(contractId: Text, report: Text) : async () {
        reports.put(contractId, report);
    };

    // Retrieve an audit report by contractId
    public query func getReport(contractId: Text) : async ?Text {
        reports.get(contractId)
    };

    // Delete a report by contractId
    public shared func deleteReport(contractId: Text) : async Bool {
        switch (reports.remove(contractId)) {
            case (?_) { true };
            case null { false };
        }
    };

    // Retrieve all stored reports
    public query func getAllReports() : async [(Text, Text)] {
        Iter.toArray(reports.entries())
    };
};
