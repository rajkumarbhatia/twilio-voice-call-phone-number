const ClientCapability = require('twilio').jwt.ClientCapability;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twimlAppSid = process.env.TWILIO_TWIML_SID;
const twilioApiKey = process.env.TWILIO_TWIML_API_KEY;
const twilioApiSecret = process.env.TWILIO_TWIML_API_SECRET;

const pushCredentialSidUSER = "CR4a8e619faedcb6f74fbe962a29096583";
const pushCredentialSidDRIVER = "CR170f3c02c17d1aee268ee44e52aff111";

// in Device.setup() we will send `To` and `outgoing_caller_id{need by phone number from Twilio console}`

async function generateTwillioTokenAndroid(body,res){
    return new Promise((resolve,reject ) => {
        var pushCredentialSid;

        if(body.user_type == "driver"){ // then place user push credentials
            pushCredentialSid = pushCredentialSidUSER;
        }else { // then place driver credentials
            pushCredentialSid = pushCredentialSidDRIVER;
        }

        const VoiceGrant = AccessToken.VoiceGrant;

        // Create a "grant" which enables a client to use Voice as a given user
        const voiceGrant = new VoiceGrant({
            outgoingApplicationSid: twimlAppSid,
            pushCredentialSid: pushCredentialSid,
            // pushCredentialSid: "IS8e412c77be038ad2e0d0495bff7801b8",
            incomingAllow: true, // Optional: add to allow incoming calls
        });
        const token = new AccessToken(
            accountSid,
            twilioApiKey,
            twilioApiSecret,
            {
                identity: body._id
            },
        );
        token.addGrant(voiceGrant);
        // token.toJwt();
        resolve({
            identity: body._id,
            token: token.toJwt(),
        })
    })
}