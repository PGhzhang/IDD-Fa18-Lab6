/*
chatServer.js
Author: David Goedicke (da.goedicke@gmail.com)
Closley based on work from Nikolas Martelaro (nmartelaro@gmail.com) as well as Captain Anonymous (https://codepen.io/anon/pen/PEVYXz) who forked of an original work by Ian Tairea (https://codepen.io/mrtairea/pen/yJapwv)
*/

var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;


//---------------------- WEBAPP SERVER SETUP ---------------------------------//
// use express to create the simple webapp
app.use(express.static('public')); // find pages in public directory

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});
//----------------------------------------------------------------------------//


//---------------------- WEBSOCKET COMMUNICATION -----------------------------//
// this is the websocket event handler and say if someone connects
// as long as someone is connected, listen for messages
io.on('connect', function(socket) {
  console.log('a new user connected');
  var questionNum = 0; // keep count of question, used for IF condition.
  socket.on('loaded', function() { // we wait until the client has loaded and contacted us that it is ready to go.

    socket.emit('answer', "Hi! I’m here to find you some good places for dinner."); //We start with the introduction;
    setTimeout(timedQuestion, 2000, socket, "What is your name?"); // Wait a moment and respond with a question.

  });
  socket.on('message', (data) => { // If we get a new message from the client we process it;
    console.log(data);
    questionNum = bot(data, socket, questionNum); // run the bot function with the new message
  });
  socket.on('disconnect', function() { // This function  gets called when the browser window gets closed
    console.log('user disconnected');
  });
});
//--------------------------CHAT BOT FUNCTION-------------------------------//
function bot(data, socket, questionNum) {
  var input = data; // This is generally really terrible from a security point of view ToDo avoid code injection
  var answer;
  var question;
  var waitTime;

  /// These are the main statments that make up the conversation.
  if (questionNum == 0) {
    answer = 'Hi ' + input + '! Let\'s get started.'; // output response
    waitTime = 2000;
    question = 'Are you eating alone or with friends?'; // load next question

  } else if (questionNum == 1) {
    if(input.toLowerCase() == 'alone'){
      answer = 'That\'s sad. You should never eat alone.';
      waitTime = 2000;
      question = 'Are you feeling like veggies or meat?'; // load next question
    }
    else if (input.toLowerCase() == 'with friends' || input.toLowerCase() == 'friends') {
      answer = 'Sounds fun!';
      waitTime = 2000;
      question = 'Are you feeling like veggies or meat?'; // load next question
    }else{
      answer = 'Sorry I did not understand.';
      question = 'Are you eating alone or with friends?';
      questionNum --;
      waittime = 2000;
    }

  } else if (questionNum == 2) {
    if (input.toLowerCase() =='veggies'){
      answer = 'I like veggies too.';
      waitTime = 2000;
      question = 'Which one do you prefer: Salads or Stir-fry?'; // load next question
    }
    else if (input.toLowerCase() =='meat') {
      answer = 'OMG, I\'m thinking about meat too. ';
      waitTime = 2000;
      question = 'Which one do you prefer: Steak or Seafood?'; // load next question
    }
    else{
      answer = 'Do you have something in mind? Type it in!';
      waitTIme = 2000;
      questions = 'What would you like for dinner?';
    }

  } else if (questionNum == 3) {
    answer = input + ' sounds good!';
    waitTime = 2000;
    question = 'How much do you plan spend on dinner? '; // load next question

  } else if (questionNum == 4) {
      answer = 'Got it.';
      waitTime = 2000;
      question = 'Tell me which location are you interested in so I can find some awesome spots around.';

  }

  else {
    if (input.toLowerCase() == 'roosevelt island'){
      answer = 'On no. There\’s nothing good on Roosevelt Island. I’m sorry for you.';
      socket.emit('changeBG', '#808080');
      socket.emit('changeFont', 'white');
      waittime = 0;
      question = '';
    }else if(input.toLowerCase() == 'manhattan'){
      answer = 'There are too many good places on Manhattan. Feel free to try any one.';
      socket.emit('changeBG', '#f37736');
      socket.emit('changeFont', 'white');
      waittime = 0;
      question = '';
    }else{
      answer = 'Sorry. I have no knowledge about ' + input + ' now.'
      waittime = 0;
      question = '';
    }
  }


  /// We take the changed data and distribute it across the required objects.
  socket.emit('answer', answer);
  setTimeout(timedQuestion, waitTime, socket, question);
  return (questionNum + 1);
}

function timedQuestion(socket, question) {
  if (question != '') {
    socket.emit('question', question);
  } else {
    //console.log('No Question send!');
  }

}
//----------------------------------------------------------------------------//
