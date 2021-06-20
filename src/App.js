import './App.css';
import {bgColors, bgFontColors} from './colors';
import {useEffect, useRef} from 'react';

const Quote = require('inspirational-quotes');
const quotes = [{}];

let j = 0;
let c = 0;
for(let i = 0; c < 200; i++) {
    const quote = Quote.getRandomQuote();
    if(quote.length <= 50) {
        // console.log(quote + ": " + quote.length)
        if(j > bgColors.length)
            j = 1;

        quotes[c] = {
            "quote": quote,
            "bgColor": bgColors[j],
            "fontColor": bgFontColors[bgColors[j]]
        }
        c++;
        j++;
    }
}

function App() {
    const ref = useRef(null);

    useEffect(() => {
        window.scrollTo({behavior: 'smooth', top: ref.current.offsetTop})
    }, [])

    return (
        <div className="container" ref={ref}>
            {/*<section ref={ref}>*/}
            {quotes.map((el, idx) => {
                return <div
                    className="card"
                    id={"page-" + idx}
                    key={idx}
                    style={{
                        backgroundColor: `${quotes[idx].bgColor}`,
                        color: `${quotes[idx].fontColor}`
                    }}
                >
                    {quotes[idx].quote}
                </div>
            })}
            {/*</section>*/}
        </div>
    );
}


export default App;
