import Text "mo:base/Text";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor KrnlSecAI {
    public type Warning = {
        severity : Text;
        message : Text;
    };

    // Define vulnerability patterns
    private stable var vulnerabilityEntries : [(Text, Text)] = [
        ("transfer", "⚠️ Reentrancy vulnerability detected!"),
        ("call.value", "⚠️ Unsafe external call detected! Consider using `.send()` or `.transfer()` instead."),
        ("delegatecall", "⚠️ Delegatecall used! This can lead to arbitrary code execution."),
        ("tx.origin", "⚠️ `tx.origin` used for authentication! Use `msg.sender` instead."),
        ("unchecked", "⚠️ Unchecked arithmetic operations! Consider using SafeMath."),
        ("assembly", "⚠️ Inline assembly detected! This may introduce low-level vulnerabilities."),
        ("selfdestruct", "⚠️ Contract can be destroyed! This may lead to fund loss.")
    ];
    
    private var vulnerabilityPatterns : HashMap.HashMap<Text, Text> = HashMap.fromIter(
        vulnerabilityEntries.vals(), 10, Text.equal, Text.hash
    );

    // Analyze contract for security vulnerabilities
    public func analyzeContract(code: Text) : async [Warning] {
        let warningsBuffer = Buffer.Buffer<Warning>(0);

        for ((key, message) in vulnerabilityPatterns.entries()) {
            if (Text.contains(code, #text key)) {
                warningsBuffer.add({ severity = "High"; message });
            };
        };

        return Buffer.toArray(warningsBuffer);
    };

    // Gas optimization checker
    public func gasOptimizationChecker(code: Text) : async [Warning] {
        let warningsBuffer = Buffer.Buffer<Warning>(0);

        if (Text.contains(code, #text "for ") or Text.contains(code, #text "while ")) {
            warningsBuffer.add({ severity = "Medium"; message = "⚠️ Loop detected! Unbounded loops may consume excessive gas." });
        };

        if (Text.contains(code, #text "storage")) {
            warningsBuffer.add({ severity = "Low"; message = "⚠️ Excessive storage writes detected! Consider optimizing storage access." });
        };

        return Buffer.toArray(warningsBuffer);
    };

    // Generate security report
    public func generateAnalysisReport(code: Text) : async Text {
        let vulnerabilities = await analyzeContract(code);
        let gasWarnings = await gasOptimizationChecker(code);
        let combinedWarnings = Array.append(vulnerabilities, gasWarnings);

        if (combinedWarnings.size() == 0) {
            return "✅ No critical issues detected!";
        };

        var report: Text = "📊 **KrnlSecAI Security Report** 📊\n";
        for (warning in combinedWarnings.vals()) {
            report := report # "\n- [" # warning.severity # "] " # warning.message;
        };

        return report;
    };

    // Ensure data persistence across upgrades
    system func preupgrade() {
        vulnerabilityEntries := Iter.toArray(vulnerabilityPatterns.entries());
    };

    system func postupgrade() {
        vulnerabilityPatterns := HashMap.fromIter(vulnerabilityEntries.vals(), 10, Text.equal, Text.hash);
    };
}
