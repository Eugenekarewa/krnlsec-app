import Text "mo:base/Text";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";

actor KrnlSecAI {
    public type Warning = {
        severity : Text;
        message : Text;
    };

    // Known vulnerability patterns
    let vulnerabilityPatterns = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);
    
    // Initializing known vulnerability patterns
    vulnerabilityPatterns.put("transfer", "⚠️ Reentrancy vulnerability detected!");
    vulnerabilityPatterns.put("call.value", "⚠️ Unsafe external call detected! Consider using `.send()` or `.transfer()` instead.");
    vulnerabilityPatterns.put("delegatecall", "⚠️ Delegatecall used! This can lead to arbitrary code execution.");
    vulnerabilityPatterns.put("tx.origin", "⚠️ `tx.origin` used for authentication! Use `msg.sender` instead.");
    vulnerabilityPatterns.put("unchecked", "⚠️ Unchecked arithmetic operations! Consider using SafeMath.");
    vulnerabilityPatterns.put("assembly", "⚠️ Inline assembly detected! This may introduce low-level vulnerabilities.");
    vulnerabilityPatterns.put("selfdestruct", "⚠️ Contract can be destroyed! This may lead to fund loss.");

    // Function to analyze contract for security issues
    public func analyzeContract(code: Text) : async [Warning] {
        let warningsBuffer: Buffer.Buffer<Warning> = Buffer.Buffer<Warning>(0);

        for ((pattern, warningMessage) in vulnerabilityPatterns.entries()) {
            if (Text.contains(code, #text pattern)) {
                warningsBuffer.add({ severity = "High"; message = warningMessage });
            };
        };

        let result: [Warning] = Buffer.toArray<Warning>(warningsBuffer);
        return result; // ✅ Explicit type declaration
    };

    // Function to analyze contract for gas optimization issues
    public func gasOptimizationChecker(code: Text) : async [Warning] {
        let warningsBuffer: Buffer.Buffer<Warning> = Buffer.Buffer<Warning>(0);

        if (Text.contains(code, #text "for ") or Text.contains(code, #text "while ")) {
            warningsBuffer.add({ severity = "Medium"; message = "⚠️ Loop detected! Unbounded loops may consume excessive gas." });
        };

        if (Text.contains(code, #text "storage")) {
            warningsBuffer.add({ severity = "Low"; message = "⚠️ Excessive storage writes detected! Consider optimizing storage access." });
        };

        let result: [Warning] = Buffer.toArray<Warning>(warningsBuffer);
        return result; // ✅ Explicit type declaration
    };

    // Function to generate a structured security report
    public func generateAnalysisReport(code: Text) : async Text {
        let vulnerabilities: [Warning] = await analyzeContract(code);
        let gasWarnings: [Warning] = await gasOptimizationChecker(code);
        let combinedWarnings: [Warning] = Array.append<Warning>(vulnerabilities, gasWarnings); // ✅ Ensure type safety

        var report: Text = "📊 KrnlSecAI Security Report 📊\n";
        for (warning in combinedWarnings.vals()) {
            report := report # "\n- [" # warning.severity # "] " # warning.message;
        };

        return report;
    };
}
