import React, {useEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTumblrSquare } from '@fortawesome/free-brands-svg-icons'


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
const [quote, setQuote] = useState("The most common way people give up their power is by thinking they don’t have any.")

  const [author, setAuthor] = useState("Alice Walker");
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)

  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }


  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  },[quoteDBUrl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
}

  return (
    <div className="App">
      <header className="App-header" >
        <div id ="quote-box">
        <h1 >* {randomNumber }</h1>
        
          <p id="text">
            "{quote}"
          </p>
          <p id="author">
            - {author}
          </p>
          <div className='button'>
            <a id="tweet-quote" style={{ color: accentColor}} href={encodeURI('http://www.twitter.com/intent/tweet?text= ${quote} -${author}')}>
            <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a id="tumblr-quote" style={{ color: accentColor}} href={encodeURI('https://www.tumblr.com/explore/trending?source=homepage_explore?text= ${quote} -${author}')}>
            <FontAwesomeIcon icon={faTumblrSquare } />
            </a>
          </div>

          <button id="new-quote" style={{ backgroundColor: accentColor }} onClick={() => getRandomQuote()}>New Quote</button>
          </div>
      </header>
    </div>
  );
}

export default App;
