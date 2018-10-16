# ChatBot

*A lab report by Hanyu Zhang*

## In this Report

## Make the ChatBot your own

**Describe what changes you made to the baseline chatbot here. Don't forget to push your modified code to this repository.**

I made a chatbot to recommend dinner ideas. I modified the questions so that they lead users to narrow down dinner options. 

[Code Link](https://github.com/PGhzhang/IDD-Fa18-Lab6/blob/master/chatServer.js)

```
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
```


## Record someone trying out your ChatBot

**Using a phone or other video device, record someone trying out your ChatBot. Upload that video to this repository and link to it here!**

[![](http://img.youtube.com/vi/bU4ILRSrvsU/0.jpg)](http://www.youtube.com/watch?v=bU4ILRSrvsU "")

---
Starter code by [David Goedicke](mailto:da.goedicke@gmail.com), closely based on work by [Nikolas Martelaro](mailto:nmartelaro@gmail.com) and [Captain Anonymous](https://codepen.io/anon/pen/PEVYXz), who forked original work by [Ian Tairea](https://codepen.io/mrtairea/pen/yJapwv).
