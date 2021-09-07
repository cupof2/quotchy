import './App.css';
import {bgColors, bgFontColors} from './colors';
import {useEffect, useRef, useState} from 'react';

const Quote = require('inspirational-quotes');
const quotes = [];

let j = 0;
for(let i = 0; i < 50; i++) {
    const quote = Quote.getRandomQuote();
    if(quote.length <= 50) {
        if(j > bgColors.length)
            j = 1;

        if(!quotes.includes(quote)) {
            quotes.push({
                "quote": quote,
                "bgColor": bgColors[j],
                "fontColor": bgFontColors[bgColors[j]]
            });
            j++;
        }
    }
}

let totalQuotes = quotes.length;
let coolDown = new Date().getTime();
function Quotchy() {
    const [nextPage, setNextPage] = useState(1);
    const scrollRef = useRef([]);

    const scroll = (e, touch=false) => {
        if(e.deltaY > 0 || touch) {
            const d = new Date();
            if(coolDown > d.getTime()) {
                return;
            }
            
            coolDown = d.getTime() + (800);
            if(nextPage > totalQuotes) {
                window.location.reload();
            } else {
                window.scrollTo({
                    top: scrollRef.current[nextPage].offsetTop,
                    behavior: "smooth"
                });
                setNextPage(nextPage + 1);
            }
        } else if(e.deltaY < 0) {
            alert("Never look back soN!");
        }
    }

    useEffect(() => {
        window.scrollTo({top: -1, behavior: 'smooth'});
    }, [])


    return (
        <div onTouchEnd={e => scroll(e, true)} onWheel={e => scroll(e)} className="container">
            {quotes.map((el, idx) => {
                return <div
                    className="card"
                    ref={el => scrollRef.current[idx] = el}
                    id={"page-" + (idx)}
                    key={idx}
                    style={{
                        backgroundColor: `${quotes[idx].bgColor}`,
                        color: `${quotes[idx].fontColor}`,
                    }}
                >
                    {quotes[idx].quote}
                </div>
            })}
            <div
                style={
                    {
                        fontStyle: "normal",
                        backgroundColor: '#ffd6a5',
                        color: 'black',
                        paddingTop: 0,
                        paddingBottom: 0
                    }
                }
                className="card"
                id={"page-" + totalQuotes}
                ref={el => scrollRef.current[totalQuotes] = el}>
                Scroll down for a new set of quotes :-)
            </div>
        </div>
    );
}


export default Quotchy;
