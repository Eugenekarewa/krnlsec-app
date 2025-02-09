// KrnlSec - AI-Powered Decentralized Security Auditor
// Canister: Security Audit Engine

import Debug "mo:base/Debug";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor KrnlSec {

    private type Severity = {
        #High;
        #Medium;
        #Low;
        #Info;
    };

    private type AuditIssue = {
        severity : Severity;
        description : Text;
    };

    private type Report = {
        contractId : Text;
        issues : [AuditIssue];
        stats : Text;
        testsPerformed : [Text];
        functionsTested : [Text];
    };

    private var reports = HashMap.HashMap<Text, Report>(10, Text.equal, Text.hash);

    // Function to submit a contract for audit
    public shared func submitContract(contractId : Text, contractCode : Text) : async Result.Result<Text, Text> {
        if (Option.isSome(reports.get(contractId))) {
            return #err("Contract already audited. Retrieve report using getAuditReport.");
        };

        let (auditIssues, functionsTested) = performAudit(contractCode);
        let codeStatistics = generateCodeStats(contractCode);

        let newReport : Report = {
            contractId = contractId;
            issues = auditIssues;
            stats = codeStatistics;
            testsPerformed = ["Security best practices check"];
            functionsTested = functionsTested;
        };

        reports.put(contractId, newReport);
        #ok("Audit completed. Use getAuditReport to view results.")
    };

    // Function to perform the actual audit
    private func performAudit(code : Text) : ([AuditIssue], [Text]) {
        var issues : [AuditIssue] = [];
        var functionsTested : [Text] = [];

        // Define audit rules
        let rules = [
            ("transfer", #High, "Potential reentrancy vulnerability detected."),
            ("caller", #Medium, "Possible unauthorized access issue."),
            ("unchecked", #High, "Unchecked math operation detected."),
            ("assert", #Low, "Assert statements found."),
            ("public shared", #Medium, "Public shared functions found.")
        ];

        // Check for issues based on rules
        for ((pattern, severity, description) in rules.vals()) {
            if (Text.contains(code, #text pattern)) {
                issues := Array.append(issues, [{
                    severity = severity;
                    description = description;
                }]);
            };
        };

        // Extract function names
        let lines = Text.split(code, #text "\n");
        for (line in Iter.toArray(lines).vals()) {
            if (Text.contains(line, #text "func")) {
                let funcName = extractFunctionName(line);
                functionsTested := Array.append(functionsTested, [funcName]);
            };
        };

        (issues, functionsTested)
    };

    // Helper function to extract function name
    private func extractFunctionName(line : Text) : Text {
        let trimmedLine = Text.trim(line, #char ' ');
        if (Text.contains(trimmedLine, #text "func ")) {
            let parts = Text.split(trimmedLine, #text "func ");
            let funcParts = Text.split(Iter.toArray(parts)[1], #char '(');
            return Text.trim(Iter.toArray(funcParts)[0], #char ' ');
        };
        ""
    };

    // Function to generate code statistics
    private func generateCodeStats(code : Text) : Text {
        let lines = Text.split(code, #text "\n");
        let lineCount = Iter.size(lines);
        let charCount = Text.size(code);

        "Code Statistics:\n" #
        "Lines of code: " # Nat.toText(lineCount) # "\n" #
        "Total characters: " # Nat.toText(charCount)
    };

    // Function to retrieve all audit reports
    public query func getAllAuditReports() : async [(Text, Report)] {
        Iter.toArray(reports.entries())
    };

    // Function to delete a specific audit report
    public shared func deleteAuditReport(contractId : Text) : async Result.Result<Text, Text> {
        switch (reports.remove(contractId)) {
            case (?_) { #ok("Audit report deleted successfully.") };
            case null { #err("No report found for the given contract ID.") };
        }
    };

    // Function to retrieve an audit report
    public query func getAuditReport(contractId : Text) : async ?Report {
        reports.get(contractId)
    };

    // Function to clear all reports
    public shared func clearReports() : async Result.Result<Text, Text> {
        reports := HashMap.HashMap<Text, Report>(10, Text.equal, Text.hash);
        #ok("All audit reports have been cleared.")
    };
};