/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




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
  
  //fetch data from the server
  const loadTweets = () => {
    $.ajax("/tweets", 
    {
      method: 'GET',
    }).then((data) => {
      renderTweets(data);
    })
  }
  loadTweets()
})