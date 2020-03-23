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
    var httpRequest = require('request');
    var instaResponse;
    
    var options = {
		url: 'https://api.instagram.com/oauth/access_token',
		method: 'POST',
		form: {
			client_id: request.query.client_id,
			client_secret: request.query.client_secret,
			grant_type: 'authorization_code',
			redirect_uri: request.query.redirect_uri,
			code: request.query.code
		}
	};
	httpRequest(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
            var user = JSON.parse(body);
            instaResponse = user;
			console.log(user);
        }
        else{
            console.log(error);
        }
	});
    return instaResponse;
});

app.listen(443)