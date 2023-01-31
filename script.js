const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const instaBtn = document.getElementById("instagram");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// show new quote
function newQuote() {
  showLoadingSpinner();

  // PICK RANDOM QUOTES
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author field is blank and replace it with 'Unknown'

  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // check quote to determine the styling
  if (quote.text.length > 60) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //SET QUOTE TO HIDE LOADER

  // authorText.textContent = quote.author; //we want auntor not entire quote so after . funtn work
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// GET QUOTES FROM API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error
  }
}

//tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  // const twitteUrl = `https://instagram.com/intent/reel?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, "_blank");
}

function instagramPost() {
  const instagramUrl = `https://www.instagram.com/`;
  window.open(instagramUrl, "_blank");
}
//event listners

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
instaBtn.addEventListener("click", instagramPost);
getQuotes();
