import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";

actor KrnlSecStorage {
  stable var stableReports : [(Text, Text)] = [];

  public func storeReport(contractId: Text, report: Text) : async () {
    stableReports := Array.append(stableReports, [(contractId, report)]);
  };

  public query func getReport(contractId: Text) : async ?Text {
    let reports = HashMap.fromIter<Text, Text>(stableReports.vals(), stableReports.size(), Text.equal, Text.hash);
    reports.get(contractId)
  };
}
