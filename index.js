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


app.post('/dialogflow', function(req, res) {
    
    if(req.body.result.action.action_name == "echo")
    {
            
            var accountNumber = parseInt(req.body.result.parameters.bankAccountNumber);
            var response = "";
            var final = ""

            request.post(
                'https://api.msufcuchatbot.me/getBalance/',
                { json: {"accountId": accountNumber, "code": "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"} },
                function (error, response) {
                    if (!error && response.statusCode == 200) {
                        return res.json({
                        speech: "Your account balance is " + JSON.stringify(response.body.balance),
                        displayText: "Your account balance is " + JSON.stringify(response.body.balance),
                        source: 'msufcuchatbot'
                    });
                    }
                }
            );
    } else {

    app.post('/transferMoney', function(req, res) {

        var accountNumber = parseInt(req.body.result.parameters.bankAccountNumber);
        var accountNumberToTransferTo = parseInt(req.body.result.parameters.bankAccountNumber2);
        var amount = parseInt(req.body.result.parameters.amount);
        var response = "";
        var final = ""

        request.post(
            'https://api.msufcuchatbot.me/transferMoney/',
            { json: {"accountId1": 1234, "accountId2": 9867, "amount": amount, "code": "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"} },
            function (error, response) {
                if (!error && response.statusCode == 200) {
                    return res.json({
                    speech: "Sucessfully transferred " + JSON.stringify(response.body.amount),
                    displayText: "Sucessfully transferred " + JSON.stringify(response.body.amount),
                    source: 'msufcuchatbot'
                });
                }
            }
        );
    });

    
    }
});

app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
