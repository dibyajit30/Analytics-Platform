var express = require("express");
const app = require("https-localhost")()
app.use(express.static('.'));
app.use('style', express.static(__dirname + '/style'));
app.use('script', express.static(__dirname + '/script'));
app.use('resources', express.static(__dirname + '/resources'));

var readFromFile = function(){
    const fs = require('fs');
    const path = "resources/user_data.json";
    return JSON.parse(fs.readFileSync(path, 'utf8'));
}

var writeToFile = function(data){
    const fs = require('fs');
    const path = "resources/user_data.json";
    fs.writeFileSync(path, JSON.stringify(data));
}

app.post("/addUser", function(request, response, next) { 
    var profiles = readFromFile();
    if(profiles === undefined){
        profiles = {"users" : []};
    }
    var user_data = {"id": request.query.id, "password": request.query.password, "auth": "no"};
    profiles.users.push(user_data);
    writeToFile(profiles);
    return response.json({"welcome":"back"}, 200);
});

app.post("/authUser", function(request, response, next){
    var profiles = readFromFile();
    if(profiles === undefined){
        profiles = {"users" : []};
    }
    for(var i=0; i<profiles.users.length; i++){
        if(profiles.users[i].id === request.query.id){
            profiles.users[i].auth = "yes";
            break;
        }
    }
    writeToFile(profiles);
    return response.json({"welcome":"back"}, 200);
});

app.post("/instaAccessToken", function(request, response, next){
    console.log("insta access");
    var fd = new FormData();    
    fd.append( 'client_id', request.query.client_id );
    fd.append( 'client_secret', request.query.client_secret );
    fd.append("grant_type", request.query.grant_type);
    fd.append("redirect_uri", request.query.redirect_uri);
    fd.append("code", request.query.code);
    const https = require('https');
    const data = JSON.stringify({
        client_id : request.query.client_id,
        client_secret : request.query.client_secret,
        grant_type : request.query.grant_type,
        redirect_uri : request.query.redirect_uri,
        code : request.query.code
    });
    const options = {
    hostname: 'https://api.instagram.com/oauth/access_token',
    port: 443,
    //path: '/todos',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
    }
    var instaResponse;
    const req = https.request(options, function(response){
        instaResponse = response;
    });
    req.write(data)
    req.end()
    return instaResponse;
});

app.listen(443)