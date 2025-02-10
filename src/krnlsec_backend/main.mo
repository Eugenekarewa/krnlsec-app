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

import KrnlSecAI "canister:krnlsec_ai";
import KrnlSecStorage "canister:krnlsec_storage";
import KrnlSecUsers "canister:krnlsec_users";
import Principal "mo:base/Principal";

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

    private func convertSeverity(severityText : Text) : Severity {
        if (Text.equal(severityText, "High")) {
            return #High;
        } else if (Text.equal(severityText, "Medium")) {
            return #Medium;
        } else if (Text.equal(severityText, "Low")) {
            return #Low;
        } else if (Text.equal(severityText, "Info")) {
            return #Info;
        } else {
            return #Info; // Default case
        };
    };

    // Function to serialize a Report into Text
    private func reportToText(report : Report) : Text {
        "Contract ID: " # report.contractId # "\n" #
        "Issues: " # debug_show(report.issues) # "\n" #
        "Stats: " # report.stats # "\n" #
        "Tests Performed: " # debug_show(report.testsPerformed) # "\n" #
        "Functions Tested: " # debug_show(report.functionsTested)
    };

    // Function to submit a contract for audit
    public shared ({ caller }) func submitContract(contractId : Text, contractCode : Text) : async Result.Result<Text, Text> {
        if (Option.isSome(reports.get(contractId))) {
            return #err("Contract already audited. Retrieve report using getAuditReport.");
        };

        // 🔐 Ensure the caller is an "Auditor"
        let roleOption = await KrnlSecUsers.getUserRole(caller);
        switch (roleOption) {
            case (?role) {
                if (role != "Auditor") {
                    return #err("Access denied. Only Auditors can submit audits.");
                };
            };
            case null {
                return #err("User not registered. Contact an administrator.");
            };
        };

        let analysisResult = await KrnlSecAI.analyzeContract(contractCode);

        let issues = Array.map(analysisResult, func (warning : KrnlSecAI.Warning) : AuditIssue {
            return { severity = convertSeverity(warning.severity); description = warning.message };
        });

        let newReport : Report = {
            contractId = contractId;
            issues = issues;
            stats = generateCodeStats(contractCode);
            testsPerformed = ["AI-powered security audit"];
            functionsTested = []; // Populate this field or remove it from the Report type
        };

        // Serialize the report to Text and store it
        let reportText = reportToText(newReport);
        await KrnlSecStorage.storeReport(contractId, reportText);
        reports.put(contractId, newReport);
        return #ok("Audit completed and stored in KrnlSecStorage.");
    };

    // Function to generate code statistics
    private func generateCodeStats(code : Text) : Text {
        let lines = Iter.toArray(Text.split(code, #text "\n"));
        let lineCount = lines.size();
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