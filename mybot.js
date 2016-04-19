'use strict';
var http = require('http');
var urlPrefix = "http://api.icndb.com/jokes/random";

const Bot = require('messenger-bot')

let bot = new Bot({
  token: 'CAAR6ZAgQVzIwBAM4f2Kc8G4WiQCWXMfyBmVfV0f5kNHmT8gn8rzvHA0R8vZA8AZBBF03E6JbJuf55E1WZCoNq881jWc8sM10EkjZBEUuBg1ZCs0M9JqxdHFeNzOmumxqJUGQMZB99qn0ZATXJsKoQStnpeJ4wPH6dEwTyZA2fHxcGBJFZC7b8ZAyfvFtVW6sEJ7ayUZD',
  verify: 'mybot_verify_token',
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    var url = urlPrefix; 
    http.get(url, function(res) {
        var body = '';

        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var chuckFact = JSON.parse(body);
	    var joke = chuckFact.value.joke;

	    console.log( "##########" + joke );
	    reply({ text: joke }, (err) => {
	      console.log( err );

	      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
	    })
        });
    }).on('error', function (e) {
        console.log("I am sorry, but I couldn't reach Chuck Norris wisdom on the web. Try again later. " + e.message );
    });


  })
})

http.createServer(bot.middleware()).listen(8000)
