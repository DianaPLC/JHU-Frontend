// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)

(function() {
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  // STEP 10:
  // Loop over the names array and say either 'Hello' or "Good Bye"
  // using either the helloSpeaker's or byeSpeaker's 'speak' method.
  // See Lecture 50, part 1
  for (var n = 0; n < names.length; n++) {

    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    var firstLetter = names[n].toLowerCase().charAt(0)

    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter == 'j') {
      byeSpeaker.speak(names[n])
    } else {
      helloSpeaker.speak(names[n])
    }
  }

  /**
   * Callback to map a string name to the appropriate statement
   * @param {string} name the string name
   * @returns a goodbye statement for names starting with "j" or a
   *   hello statement otherwise
   */
  var getStatement = function(name) {
    var firstLetter = name.toLowerCase().charAt(0)
    if (firstLetter == 'j') {
      return byeSpeaker.speakSimple(name);
    }
    return helloSpeaker.speakSimple(name);
  }
  // Map name array to statements
  var statementList = names.map(getStatement);
  // Print each statement in the mapped list
  for (var statement of statementList) {
    console.log(statement);
  }

  /**
   * Callback to accumulate statements into a hello list and a bye list
   * @param {object} listAccumulator an object holding the two lists
   * @param {string} currentName the name to build a statement for
   * @returns the listAccumulator with the correct statement for
   *   currentName added to the appropriate list
   */
  function statementReducer(listAccumulator, currentName) {
    var firstLetter = currentName.toLowerCase().charAt(0)
    if (firstLetter == 'j') {
      listAccumulator.bye.push(byeSpeaker.speakSimple(currentName));
    } else {
      listAccumulator.hello.push(helloSpeaker.speakSimple(currentName));
    }
    return listAccumulator;
  }
  // reduce name array to build the two-list object
  var reducedStatements = names.reduce(statementReducer, {hello: [], bye: []})
  // print each element of both statement lists to console
  for (var list in reducedStatements) {
    for (var statement of reducedStatements[list]) {
      console.log(statement);
    }
  }
})();
