import CryptoJS from 'crypto-js';

// Function to encrypt data
function encryptData(key, data) {
    // Convert the key to a format suitable for CryptoJS
    const formattedKey = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), formattedKey, {
        mode: CryptoJS.mode.ECB, // You can change the mode as needed
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString(); // Return the encrypted data as a string
}

// Function to decrypt data
function decryptData(key, encryptedData) {
    // Convert the key to a format suitable for CryptoJS
    const formattedKey = CryptoJS.enc.Utf8.parse(key);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, formattedKey, {
        mode: CryptoJS.mode.ECB, // Ensure the mode is the same as used in encryption
        padding: CryptoJS.pad.Pkcs7
    });

    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData); // Parse and return the original object
}




export {encryptData, decryptData}
