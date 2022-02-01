$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {

    // get access to counter class using dom traversal
    const counter = $(this).parent().children(".form-footer").children(".counter");
    
    let currentLen = $(this).val().length;
    let maxLen = 140;

    // change class styling depending on input len
    if (currentLen > 140) {
      counter.addClass('warning').html(maxLen - currentLen);
      
    } else {
      counter.removeClass('warning').html(maxLen - currentLen);
    }
  })
});
