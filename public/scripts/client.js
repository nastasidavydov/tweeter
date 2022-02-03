/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// takes an array of tweets and append to #tweet-container
const renderTweets = tweets => {
  $('#tweet-container').empty();
  for (let tweet of tweets) {
    let layout = createTweetElement(tweet);
    $('#tweet-container').append(layout);
  }
};

// Preventing XSS with Escaping
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// takes in tweet obj and insert data into layout
const createTweetElement = tweet => {
  
  const layout = ` 
  <article class="tweet">
  <header>
    <div class="user-data">
      <img class="avatar" src="${tweet.user.avatars}"/>
      <span>${escape(tweet.user.name)}</span>
    </div>
    <div class="username">${escape(tweet.user.handle)}</div>
  </header>

  <div class="tweet-content">
    <p>${escape(tweet.content.text)}</p>
  </div>

  <footer>
    <div class="date">
      <span>${escape(timeago.format(tweet.created_at))}</span>
    </div>
    <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>
  `;
  return layout;
};


$(document).ready(function() {
  
  const form = $(".new-tweet").children("form");

  // send form input data to the server
  form.submit(function(event) {
    event.preventDefault();
    
    //input field form validation
    let input = $("#tweet-text").val();
    if (!input) {
      return $(".error-msg").text('Empty field').slideDown();
    } else if (input.length > 140) {
      return $(".error-msg").text('You exceeded max message length').slideDown();
    }
    $(".error-msg").hide();

    const tweetText = form.serialize();
    $.ajax("/tweets", {
      method: 'POST',
      data: tweetText,

    }).then(() => {

      // reset counter and clears textarea
      $(".counter").val(140);
      $("#tweet-text").val('');

      // loads tweets dinamycally
      loadTweets();
    });
  });

  //fetch data from the server
  const loadTweets = () => {
    
    $.ajax("/tweets", {

      method: 'GET',
      
    }).then((data) => {
      renderTweets(data.reverse());
    });
  };
  // when a page load -> add first tweets
  loadTweets();
});

