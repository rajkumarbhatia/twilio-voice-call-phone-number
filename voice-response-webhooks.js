async function voiceResponse(toNumber,body){
    // Create a TwiML voice response
    var callerId = "255";
    const twiml = new VoiceResponse();
    if (toNumber) {
        // Wrap the phone number or client name in the appropriate TwiML verb
        // if is a valid phone number
        const attr =await isAValidPhoneNumber(toNumber) ? 'number' : 'client';
        const dial = twiml.dial({
            // callerId: '+1XXXYYYZZZZ',
            callerId: body.outgoing_caller_id,
        });
        dial.number(toNumber);
        console.log("Thanks Number");
        // dial[attr]({}, toNumber);
    } else {
        twiml.say('Thanks for calling!');
        console.log("Thanks Calling");
    }
    return new Promise((resolve,reject ) => {
        resolve(twiml.toString());
    })
}