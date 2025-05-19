//@ts-check

let SimpleCrypto;
let ExpoCrypto;
import CryptoJS from "crypto-js"; // Pure JS fallback

try {
    SimpleCrypto = require("react-native-simple-crypto");
} catch (e) {
    SimpleCrypto = null;
}

try {
    ExpoCrypto = require("expo-crypto");
} catch (e) {
    ExpoCrypto = null;
}

function num2Int(n) {
    return Math.floor(n);
}

export async function generateSignature(projectId, apiKey, body = {}) {
    const timestamp = Date.now();
    const params = JSON.stringify(body);
    const hashInput = projectId + params + num2Int(timestamp);

    let hmacHex;

    if (SimpleCrypto) {
        const keyBytes = SimpleCrypto.utils.convertUtf8ToBytes(apiKey);
        const messageBytes = SimpleCrypto.utils.convertUtf8ToBytes(hashInput);
        const hmac = await SimpleCrypto.HMAC.hmac256(messageBytes, keyBytes);
        hmacHex = SimpleCrypto.utils.convertArrayBufferToHex(hmac).toUpperCase();
    } else if (ExpoCrypto && ExpoCrypto.digestStringAsync) {
        hmacHex = (await ExpoCrypto.digestStringAsync(
            ExpoCrypto.CryptoDigestAlgorithm.SHA256,
            hashInput + apiKey,
            { encoding: ExpoCrypto.CryptoEncoding.HEX }
        )).toUpperCase();
    } else {
        // Fallback to crypto-js
        hmacHex = CryptoJS.HmacSHA256(hashInput, apiKey).toString().toUpperCase();
    }

    return {
        timestamp,
        signature: hmacHex,
    };
}
