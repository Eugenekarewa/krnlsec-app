# KrnlSec Project Documentation

## Overview
The KrnlSec project is an AI-powered decentralized security auditor designed to analyze smart contracts for vulnerabilities and provide audit reports. It consists of several canisters, including the backend, AI analysis, storage, and user management.

## Functions in `src/krnlsec_backend/main.mo`

### convertSeverity
```motoko
private func convertSeverity(severityText: Text) : Severity {
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
```
- **Purpose**: Converts a severity level represented as text into a corresponding `Severity` type.
- **Parameters**: 
  - `severityText`: A string representing the severity level.
- **Returns**: The corresponding `Severity` type.

### reportToText
```motoko
private func reportToText(report: Report) : Text {
    "Contract ID: " # report.contractId # "\n" #
    "Issues: " # debug_show(report.issues) # "\n" #
    "Stats: " # report.stats # "\n" #
    "Tests Performed: " # debug_show(report.testsPerformed) # "\n" #
    "Functions Tested: " # debug_show(report.functionsTested)
};
```
- **Purpose**: Serializes a `Report` object into a human-readable text format.
- **Parameters**: 
  - `report`: The `Report` object to be serialized.
- **Returns**: A string representation of the report.

### submitContract
```motoko
public shared ({ caller }) func submitContract(contractId: Text, contractCode: Text) : async Result.Result<Text, Text> {
    // Function implementation...
};
```
- **Purpose**: Submits a smart contract for auditing. It checks if the contract has already been audited and verifies the caller's role.
- **Parameters**: 
  - `contractId`: The ID of the contract being submitted.
  - `contractCode`: The code of the contract to be analyzed.
- **Returns**: A result indicating success or failure of the submission.

### generateCodeStats
```motoko
private func generateCodeStats(code: Text) : Text {
    // Function implementation...
};
```
- **Purpose**: Generates statistics about the provided code, such as line count and character count.
- **Parameters**: 
  - `code`: The code to analyze.
- **Returns**: A string containing the code statistics.

### getAllAuditReports
```motoko
public query func getAllAuditReports() : async [(Text, Report)] {
    // Function implementation...
};
```
- **Purpose**: Retrieves all audit reports stored in the system.
- **Returns**: An array of tuples containing contract IDs and their corresponding reports.

### deleteAuditReport
```motoko
public shared func deleteAuditReport(contractId: Text) : async Result.Result<Text, Text> {
    // Function implementation...
};
```
- **Purpose**: Deletes a specific audit report based on the contract ID.
- **Parameters**: 
  - `contractId`: The ID of the contract whose report is to be deleted.
- **Returns**: A result indicating success or failure of the deletion.

### getAuditReport
```motoko
public query func getAuditReport(contractId: Text) : async ?Report {
    // Function implementation...
};
```
- **Purpose**: Retrieves a specific audit report based on the contract ID.
- **Parameters**: 
  - `contractId`: The ID of the contract whose report is to be retrieved.
- **Returns**: The corresponding `Report` object, if found.

### clearReports
```motoko
public shared func clearReports() : async Result.Result<Text, Text> {
    // Function implementation...
};
```
- **Purpose**: Clears all stored audit reports from the system.
- **Returns**: A result indicating success or failure of the operation.
