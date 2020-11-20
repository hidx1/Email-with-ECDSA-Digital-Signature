function sign(message, privateKey) {
    var messageDigest = keccak(message);

    var signature = RSA(messageDigest, privateKey);

    var signedMessage = message + "\n--BEGIN SIGNATURE--\n" + signature + "\n--END SIGNATURE--";

    return signedMessage;
}

function verify(embedMessage, publicKey) {

    var messageArray = embedMessage.split("\n--BEGIN SIGNATURE--\n");

    var message = messageArray[0];

    var signature = messageArray[1];
    signature = signature.split("\n--END SIGNATURE--")[0];

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