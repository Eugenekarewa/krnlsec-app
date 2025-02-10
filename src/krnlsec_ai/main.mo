import Text "mo:base/Text";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer"; // Use Buffer for dynamic arrays

actor KrnlSecAI {
    public func krnlsec_aiMotoko() : async Text {
        return "This is the krnlsec_aiMotoko function.";
    };
    
    public type Warning = {
        severity : Text;
        message : Text;
    };

    public func analyzeContract(code: Text) : async [Warning] {
        let warningsBuffer = Buffer.Buffer<Warning>(0); // Mutable buffer for warnings

        if (Text.contains(code, #text "transfer")) {
            warningsBuffer.add({ severity = "High"; message = "⚠️ Reentrancy vulnerability detected!" });
        };

        if (Text.contains(code, #text "caller")) {
            warningsBuffer.add({ severity = "Medium"; message = "⚠️ Possible unauthorized access issue!" });
        };

        if (Text.contains(code, #text "overflow")) {
            warningsBuffer.add({ severity = "High"; message = "⚠️ Potential integer overflow/underflow detected!" });
        };

        return Buffer.toArray(warningsBuffer); // Convert mutable buffer to immutable array
    }
}
