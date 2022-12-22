let typingTimer;
let doneTyping = false;
let model = "GPT3"
let AItyped = false;
// On keyup, start the countdown
$('.writing-box textarea').keyup(function() {
  clearTimeout(typingTimer);
  // If the user is done typing, wait 3 seconds before checking for a period
  typingTimer = setTimeout(checkForPeriod, 3000);
});
// On keydown, clear the countdown
$('.writing-box textarea').keydown(function(event) {
  if(AItyped) AItyped = false;
  if (event.keyCode !== 8) { // Not the backspace key
    doneTyping = false;
  }
});

// hide the how-to modal
document.getElementById("close-how-to").addEventListener("click", function() {
  document.getElementById("how-to").classList.add("hidden");
});

// Select the combobox element
const combobox = document.querySelector('.combobox select');

// Set the initial value of the model variable to the value of the selected option
model = combobox.value;

// Listen for changes to the selected option
combobox.addEventListener('change', function() {
   // Update the value of the model variable when the selected option changes
   model = this.value;
});

function checkForPeriod() {
  if (!doneTyping && !AItyped) {
    const text = $('.writing-box textarea').val();

    if (text.endsWith('.') || text.endsWith('. ') || text.endsWith('!') || text.endsWith('?')|| text.endsWith('! ') || text.endsWith('? ')) {
      doneTyping = true;

      $.ajax({
        type: 'POST',
        url: `/co-write-${model}`,
        data: { text: text },
        success: function(response) {
          // Split the text into an array of sentences
          var sentences = response.split(/[.!?]+/);

          // Get the last sentence
          var lastSentence = sentences[sentences.length - 2] + ".";
          console.log(lastSentence);
          //call typeEffect function
          typeEffect(lastSentence, 50);
          AItyped = true;
        },
        error: function(error) {
          //if error code is 429, it means that the user has reached the daily limit
          if (error.status == 500) {
            alert(model + " is unavailable right now. Try changing the model on the right.");
          }
        }
      });
    }
  }
}

//typeEffect function that will add text to the textarea
function typeEffect(text, speed) {
  var i = 0;
  var timer = setInterval(function() {
    if (i < text.length) {
      $('.writing-box textarea').val($('.writing-box textarea').val() + text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}