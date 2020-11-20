function sign(message, privateKey) {
    var messageDigest = keccak(message);

    var signature = RSA(messageDigest, privateKey);

    var signedMessage = "--BEGIN SIGNATURE--\n" + signature + "\n--END SIGNATURE--\n" + message;

    return signedMessage;
}

function verify(embedMessage, publicKey) {

    var messageArray = embedMessage.split("\n--END SIGNATURE--\n");

    var signature = messageArray[0].split("--BEGIN SIGNATURE--\n")[1];
    
    var message = ""
    for (let i = 1; i < messageArray.length; i++) {
        message += messageArray[i]
    }

    console.log("signature: " + signature)
    console.log("message: " + message)

    var messageDigest1 = RSA(signature, publicKey);

    var messageDigest2 = keccak(message);

    return messageDigest1 === messageDigest2;
}

function keccak(message) {

    return "thisisasignature";
}

function RSA(messageDigest, key) {

    return messageDigest;
}