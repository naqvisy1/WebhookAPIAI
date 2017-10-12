'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/echo', function(req, res) {
    
    var accountNumber = parseInt(req.body.result.parameters.bankAccountNumber);
    
    if(accountNumber === 532579)
    {
        var response = "Your balance is $9,131,993.00";
    }
    else if(accountNumber === 473823)
    {
        var response = "Your balance is $5,102,017.00";
    }
    else
    {
        var response = "Sorry, but that account does not exist at this time";
    }
    //var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: response,
        displayText: response,
        source: 'msufcuchatbot'
    });
});

app.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
