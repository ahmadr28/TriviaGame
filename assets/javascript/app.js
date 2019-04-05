var card = $('#quiz-area');

// Question set
var questions = [
   {
      question: 'What was the first full length CGI movie?',
      answers: ["A Bug's Life", 'Monsters Inc.', 'Toy Story', 'The Lion King'],
      correctAnswer: 'Toy Story'
   },
   {
      question: 'Which of these is NOT a name of one of the Spice Girls?',
      answers: ['Sporty Spice', 'Fred Spice', 'Scary Spice', 'Posh Spice'],
      correctAnswer: 'Fred Spice'
   },
   {
      question: 'Which NBA team won the most titles in the 90s?',
      answers: ['New York Knicks', 'Portland Trailblazers', 'Los Angeles Lakers', 'Chicago Bulls'],
      correctAnswer: 'Chicago Bulls'
   },
   {
      question: "Which group released the hit song, 'Smells Like Teen Spirit'?",
      answers: ['Nirvana', 'Backstreet Boys', 'The Offspring', 'No Doubt'],
      correctAnswer: 'Nirvana'
   },
   {
      question: "Which popular Disney movie featured the song, 'Circle of Life'?",
      answers: ['Aladdin', 'Hercules', 'Mulan', 'The Lion King'],
      correctAnswer: 'The Lion King'
   },
   {
      question:
         "Finish this line from the Fresh Prince of Bel-Air theme song: 'I whistled for a cab and when it came near, the license plate said...'",
      answers: ['Dice', 'Mirror', 'Fresh', 'Cab'],
      correctAnswer: 'Fresh'
   },
   {
      question: "What was Doug's best friend's name?",
      answers: ['Skeeter', 'Mark', 'Zach', 'Cody'],
      correctAnswer: 'Skeeter'
   },
   {
      question: 'What was the name of the principal at Bayside High in Saved By The Bell?',
      answers: ['Mr.Zhou', 'Mr.Driggers', 'Mr.Belding', 'Mr.Page'],
      correctAnswer: 'Mr.Belding'
   }
];

// Variable that will hold the setInterval
var timer;

var game = {
   correct: 0,
   incorrect: 0,
   counter: 120,

   countdown: function() {
      game.counter--;
      $('#counter-number').html(game.counter);
      if (game.counter === 0) {
         console.log('TIME UP');
         game.done();
      }
   },

   start: function() {
      timer = setInterval(game.countdown, 1000);

      $('#sub-wrapper').prepend("<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>");

      $('#start').remove();

      for (var i = 0; i < questions.length; i++) {
         card.append('<h2>' + questions[i].question + '</h2>');
         for (var j = 0; j < questions[i].answers.length; j++) {
            card.append(
               "<input type='radio' name='question-" +
                  i +
                  "' value='" +
                  questions[i].answers[j] +
                  "''>" +
                  questions[i].answers[j]
            );
         }
      }

      card.append("<button id='done'>Done</button>");
   },

   done: function() {
      var inputs = card.children('input:checked');
      for (var i = 0; i < inputs.length; i++) {
         if ($(inputs[i]).val() === questions[i].correctAnswer) {
            game.correct++;
         } else {
            game.incorrect++;
         }
      }
      this.result();
   },

   result: function() {
      clearInterval(timer);

      $('#sub-wrapper h2').remove();

      card.html('<h2>All Done!</h2>');
      card.append('<h3>Correct Answers: ' + this.correct + '</h3>');
      card.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
   }
};

// CLICK EVENTS

$(document).on('click', '#start', function() {
   game.start();
});

$(document).on('click', '#done', function() {
   game.done();
});
