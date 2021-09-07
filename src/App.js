import './App.css';
import { bgColors, bgFontColors } from './colors';
import { useEffect, useRef, useState } from 'react';

const Quote = require('inspirational-quotes');
const Scroll = require('react-scroll');
const Element = Scroll.Element;
const scroller = Scroll.scroller;

const quotes = [];
let j = 0;

for(let i = 0; i < 200; i++) {
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

    const smoothScroll = (e, touch = false) => {
        if(e.deltaY > 0 || touch) {
            const d = new Date();
            if(coolDown > d.getTime()) {
                return;
            }

            coolDown = d.getTime() + (1000);
            if(nextPage >= totalQuotes || totalQuotes === 0) {
                window.location.reload();
            } else {
                console.log(`scroll to ${scrollRef.current[nextPage].props.name}`)
                scroller.scrollTo(scrollRef.current[nextPage].props.name, {
                    duration: 900,
                    delay: 0,
                    smooth: 'easeInOutQuart'
                })
                setNextPage(nextPage + 1);
            }
        } else if(e.deltaY < 0) {
            alert("Never look back soN!");
        }
    }

    useEffect(() => {
        Scroll.animateScroll.scrollToTop({ smooth: 'easeInOutQuart' });
    }, [])

    return (
        <>
            {quotes.map((el, idx) => (
                <Element
                    key={idx}
                    name={`page-${idx}`}
                    className='card'
                    style={{
                        backgroundColor: `${quotes[idx].bgColor}`,
                        color: `${quotes[idx].fontColor}`,
                    }}
                    ref={el => scrollRef.current[idx] = el}
                    onWheel={e => smoothScroll(e)}
                    onTouchEnd={e => smoothScroll(e, true)}>
                    {quotes[idx].quote}
                </Element>
            ))}
        </>
    );
}

export default Quotchy;