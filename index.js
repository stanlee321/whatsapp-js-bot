const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;

if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}


// Use the saved values
const client = new Client({
    // authStrategy: new LegacySessionAuth({
    //     session: sessionData
    // }),
    authStrategy: new LocalAuth({
        clientId: "client-one"
      }),
});

// Save session values to the file upon successful auth
// client.on('authenticated', (session) => {
//     sessionData = session;
//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         if (err) {
//             console.error(err);
//         }
//     });
// });

client.on('authenticated', (session) => {
    console.log('WHATSAPP WEB => Authenticated');
  });


client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    //console.log('QR RECEIVED', qr);
    console.log("Generating...")
    qrcode.generate(qr, {small: true});

});

client.on('ready', async () => {
    console.log('Client is ready!');
    const numbers = [
        "123@c.us",

    ]

    for (const number of numbers){
        const randomNumber = Math.floor(Math.random() * (9999 - 1000) + 1000);
        const message = `
            Hello there!, I am the PRESTO bot!.
            Your random code is: ${randomNumber}
        ` ;

        console.log(`⚡⚡⚡ Enviando Status....${number}`);
        await client.sendMessage(number, message);
    }
   

    // const myn =  await client.getContacts();

    // fs.writeFile("./contacts_data.json", JSON.stringify(myn), (err) => {
    //     if (err) {
    //         console.error(err);
    //     }
    // });

    // Setting status..
    // console.log("Trying to set status...");
    // const myStatus = " ⚡⚡⚡ Testing automation bot with WhatsApp Web and NODEJS";
    // await client.setStatus(myStatus);

});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});


client.initialize();


