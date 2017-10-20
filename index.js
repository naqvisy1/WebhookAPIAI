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


    var response = "";
    var final = ""
    if(req.body.result.action == "echo"){
        var accountNumber = parseInt(req.body.result.parameters.bankAccountNumber);
        return res.json({
            speech: JSON.stringify(response),
            displayText: JSON.stringify(response),
            source: 'msufcuchatbot'
        });

//        request.post(
//             'https://api.msufcuchatbot.me/getBalance/',
//             { json: {"accountId": accountNumber, "code": "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"} },
//             function (error, response) {
//                 if (!error && response.statusCode == 200) {
//                     return res.json({
//                         speech: "Your account balance is " + JSON.stringify(response.body.balance),
//                         displayText: "Your account balance is " + JSON.stringify(response.body.balance),
//                         source: 'msufcuchatbot'
//                     });
//                 }
//             }
//         );
    } else {
        var accountNumber1 = parseInt(req.body.result.parameters.bankAccountNumber1);
        var accountNumber2 = parseInt(req.body.result.parameters.bankAccountNumber2);
        var amount = parseInt(req.body.result.parameters.amount);
        request.post(
            'https://api.msufcuchatbot.me/transferMoney/',
            { json: {"accountId1": accountNumber1, "accountId2": accountNumber2, "amount":amount, "code": "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"} },
            function (error, response) {
                if (!error && response.statusCode == 200) {
                    return res.json({
                        speech: "Succesfully transferred " + JSON.stringify(response.body.amount),
                        displayText: "Succesfully transferred " + JSON.stringify(response.body.amount),
                        source: 'msufcuchatbot'
                    });
                }
            }
        );
    }
});


app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
