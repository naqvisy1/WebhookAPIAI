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
        var accountNumber = parseInt(req.body.result.parameters.sourceAccountNumber);
        var sourceBankAcctType = req.body.result.parameters.sourceBankAcctType;
       request.post(
            'https://api.msufcuchatbot.me/getBalance/',
            { json: {"accountId": accountNumber, "sourceBankAcctType": sourceBankAcctType,  "code": "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"} },
            function (error, response) {
                if (!error && response.statusCode == 200) {
                    return res.json({
                        speech: "Your account balance is $" + JSON.stringify(response.body.balance),
                        displayText: "Your account balance is $" + JSON.stringify(response.body.balance),
                        source: 'msufcuchatbot'
                    });
                }
            }
        );
    }
    else if(req.body.result.action == "debug"){
             return res.json({
                speech: JSON.stringify(req.body.originalRequest),
                displayText: JSON.stringify(req.body.originalRequest),
                source: 'msufcuchatbot'
            });
    }
    else if (req.body.result.action == "UpdateInfo.UpdateInfo-custom") {

      //Update user account info intent
      if (req.body.result.parameters) {
        //Parameters for changing account info
        var accountNumber = parseInt(req.body.result.parameters.originalValue);
        var updateInfo = req.body.result.parameters.updateInfo;
        var whatToUpdate = req.body.result.parameters.whatToUpdate;

        // Post to node.js api for `updateInfo`
        request.post(
             'https://api.msufcuchatbot.me/updateInfo/',
             { json: {"accountId": accountNumber,"updateInfo": updateInfo, "whatToUpdate": whatToUpdate , "code": "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"} },
             function (error, response) {
                 if (!error && response.statusCode == 200) {
                     return res.json({
                         speech: "Succesfully updated!",
                         displayText: "Succesfully updated!",
                         source: 'msufcuchatbot'
                     });
                 }
             }
         );
      }

    }
    else if( req.body.result.action == "internal-transfer") {
        var sourceAccountNumber = parseInt(req.body.result.parameters.sourceAccountNumber);
        var sourceAccountType = req.body.result.parameters.sourceAccountType;
        var destinationAccountType = req.body.result.parameters.destinationAccountType;
        var amount = parseInt(req.body.result.parameters.amount);
        request.post(
            'https://api.msufcuchatbot.me/internalTransferMoney/',
            { json: {"sourceAccountNumber": sourceAccountNumber, "sourceBankAccountType": sourceAccountType, "destinationBankAccountType": destinationAccountType, "amount":amount, "code": "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"} },
            function (error, response) {
                if (!error && response.statusCode == 200) {
                    return res.json({
                        speech: "Succesfully transferred $" + JSON.stringify(response.body.amount),
                        displayText: "Succesfully transferred $" + JSON.stringify(response.body.amount),
                        source: 'msufcuchatbot'
                    });
                }
            }
        );
    }
    else if(req.body.result.action == "autopay-setup"){
      var accountNumber = parseInt(req.body.result.parameters.accountNumber);
      var autopayShare = req.body.result.parameters.autopayShare;
      var sourceShare = req.body.result.parameters.sourceShare;
      var autopayAmount = req.body.result.parameters.autopayAmount;

      request.post('https://api.msufcuchatbot.me/autopaySetup/',
        {json: {"accountNumber": accountNumber, "autopayShare": autopayShare,
          "sourceShare": sourceShare, "autopayAmount": autopayAmount}},
          function(error, response){
            if (!error && response.statusCode == 200) {
              var ordinal = require('ordinal');
              return res.json({speech: "Okay, starting automatic payments. On the "
                  + JSON.stringify(ordinal(response.body.autopayDate))
                  + " of every month, $" + JSON.stringify(response.body.autopayAmount)
                  + " will be paid to your " + JSON.stringify(response.body.autopayShare)
                  + " from your " + JSON.stringify(response.body.sourceShare) + ". Is this correct?",
                displayText: "Okay, starting automatic payments. On the "
                  + JSON.stringify(ordinal(response.body.autopayDate))
                  + " of every month, $" + JSON.stringify(response.body.autopayAmount)
                  + " will be paid to your " + JSON.stringify(response.body.autopayShare)
                  + " from your " + JSON.stringify(response.body.sourceShare) + ". Is this correct?",
                source: msufcuchatbot
              });
          }
      )
    }
  }
    else {
        var accountNumber1 = parseInt(req.body.result.parameters.sourceAccountNumber);
        var accountNumber2 = parseInt(req.body.result.parameters.destinationAccountNumber);
        //Why are we using parseInt on the amount? What if the amount has a decimal value?
        var amount = parseInt(req.body.result.parameters.amount);
        request.post(
            'https://api.msufcuchatbot.me/transferMoney/',
            { json: {"accountId1": accountNumber1, "accountId2": accountNumber2,
              "amount":amount, "code": "amzn1.ask.account.AGPEDC3Y57INSQR2Z7PPA6V7MV3GVNC6X2ZAEBXAIVP2SFA3VOZNLC537ML6Q5NEBPEQEEBT2AITE62N2OPW6YX37QZATHY7RHNGUDY5PHDADMAC5NBBBWSEFDCJR45VA3KOYDRDTGV5J743SAFSFUZFF7XM6Q3RNQTPMB5G24MFWYWBOSATFP7DIE7XG4BHCEUPKTP3ZRVIBFI"} },
            function (error, response) {
                if (!error && response.statusCode == 200) {
                  return res.json({
                      speech: "Succesfully transferred $" + JSON.stringify(response.body.amount),
                      displayText: "Succesfully transferred $" + JSON.stringify(response.body.amount),
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
