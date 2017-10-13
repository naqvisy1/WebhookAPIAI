'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const http = require('http');
var request = require('request');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/echo', function(req, res) {
    
    var accountNumber = parseInt(req.body.result.parameters.bankAccountNumber);
    var speech2 = "my account balance is 35000";
    var response = "";
    console.log("acc: " , accountNumber);

request.post(
    'http://api.msufcuchatbot.me/getBalance/',
    { json: {"accountId": accountNumber, "code": "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"} },
    function (error, response) {
        console.log("requestasdsfasf");
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
        console.log("yo");
        
        
        return res.json({
            speech: speech2,
            displayText: speech2,
            source: 'msufcuchatbot'
        });
    }
);
//     http.post("http://api.msufcuchatbot.me/getBalance/", {accountId: accountNumber, code: "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"}, (resp) => {
//         return res.json({
//             speech: speech2,
//             displayText: speech2,
//             source: 'msufcuchatbot'
//         });
        //       let data = '';
//       // A chunk of data has been recieved.
//       resp.on('data', (chunk) => {
//         data += chunk;
//       });

//       // The whole response has been received. Print out the result.
//       resp.on('end', () => {
//         console.log(JSON.parse(data));
//         response = JSON.parse(data);
//         return res.json({
//             speech: "my account balance is " + response,
//             displayText: response,
//             source: 'msufcuchatbot'
//         });
//       });

//     }).on("error", (err) => {
//       console.log("Error: " + err.message);
//     });
//     console.log("1", response);

//     if(accountNumber === 532579)
//     {
//         var response = "Your balance is $3,498.63";
//     }
//     else if(accountNumber === 473823)
//     {
//         var response = "Your balance is $1,856.99";
//     }
//     else
//     {
//         var response = "Sorry, but that account does not exist at this time";
//     }
//     var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
//     return res.json({
//         speech: response,
//         displayText: response,
//         source: 'msufcuchatbot'
//     });
});

app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
