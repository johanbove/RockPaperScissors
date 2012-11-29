Rock Paper Scissors
===================

version: 0.2

This is a simple game of "Rock Paper Scissors" against the computer.

Features
--------
The game keeps track of the number of games, the players scores and winning streaks.
Note that the scores are lost when you refresh the page!

Requirements
------------
* a browser
* JavaScript version required: Ecmascript 5

Inspiration
-----------
* Code was checked in JSLint
* Idea for this project was inspired by the [JavaScript course on Codecademy](http://www.codecademy.com/courses/javascript-beginner-en-Bthev-mskY8) by Leng Lee.
* Applies the [Fisher-Yates shuffle algorithm](http://bost.ocks.org/mike/shuffle/)

FAQ
---
1. *I keep on losing my scores when I close the page!*  
Warning: scores are unfortunately lost when you refresh the page. Next version will use [HTML5 local storage](http://diveintohtml5.info/storage.html) to keep track of your score.
2. *I am tired of playing against a machine! Can I play this with my friends?*  
Playing against your friends is planned and I'll probably implement this using HTML5 websockets, eg. [socket.io](http://socket.io/), and I'm thinking of a multi-player version as well.
3. *I don't speak English!*    
A multi-lingual version is planned using some nifty _i18n_ implementation!
4. *It looks bad and boring!*  
Yeah, you're totally right! The plan is to design something prettier to look at as well. Currently using the JS alert boxes seems a little too old-skool. Thinking of applying [backbone.js](http://backbonejs.org/) for exactly that purpose!
5. *This is too easy! What about a Rock-Paper-Scissors-Spock-Lizard version?*  
Awesome idea! I'm on it, but it'll have to be a different game though... hmm.