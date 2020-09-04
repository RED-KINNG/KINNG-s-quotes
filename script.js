
const quoteContainer = document.getELementById('quote-container');
const quoteText = document.getELementById('quote');
const authorText = document.getELementById('author');
const twitterBtn = document.getELementById('twitter');
const newQuoteBtn = document.getELementById('new-quote');
const loader = document.getElementById('loader');


function showloadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinner() {
        if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


//  Get quote from API

async function getQuote() {
    showloadingSpinner();
    const proxyUrl = 'https://desolate-plateau-47523.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.jason();
        // If author is blank, add 'unknown'
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';

        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes

       if (data.quoteText.length > 120) {
           quoteText.classList.add('long-quote');
       } else{
           quoteText.classList.remove('long-quote');
       }
        quoteText.innerText = data.quoteText;
        
        removeLoadingSpinner();
    } catch (error) {
        getQuote();
        
    }


}
// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');

}

// Event Listeners for each buttons

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load

getQuote();

