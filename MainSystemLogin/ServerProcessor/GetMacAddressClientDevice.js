
var express = require('express');
var app = express();
var useragent = require('express-useragent');
 

function webSubscribtionWebAgentInforGetter(){
    app.use(useragent.express());
app.get('/getUserAgentInformation', function(req, res){


    var data = {
       deviceType: req.useragent.isMobile,
       ipData:req.ip
    };
    res.status(400).send(data);
});
//app.listen(3000);

}

module.exports={webSubscribtionWebAgentInforGetter}



// The client's IP address can be retrieved from 
// req.ip or req.connection.remoteAddress 
// (though req.ip is generally preferred as it handles proxy headers).