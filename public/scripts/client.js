/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetsData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1643583465541
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1643669865541
  }
];


const renderTweets = tweets => {
  for (let tweet of tweets) {
    let layout = createTweetElement(tweet);
    $('#tweet-container').append(layout);
  }
}


const createTweetElement = tweet => {
  
  const layout = ` 
  <article class="tweet">
  <header>
    <div class="user-data">
      <img class="avatar" src="${tweet.user.avatars}"/>
      <span>${tweet.user.name}</span>
    </div>
    <div class="username">${tweet.user.handle}</div>
  </header>

  <div class="tweet-content">
    <p>${tweet.content.text}</p>
  </div>

  <footer>
    <div class="date">
      <span>${timeago.format(tweet.created_at)}</span>
    </div>
    <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>
  `
  return layout;
};


$(document).ready(function(){
  renderTweets(tweetsData);
  const form = $(".new-tweet").children("form");
  form.submit(function(event) {
    event.preventDefault();

    const tweetText = form.serialize();
    $.ajax("/tweets", 
    {
      method: 'POST',
      data: tweetText,
    })
  })
})