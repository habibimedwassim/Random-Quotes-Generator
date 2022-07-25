function App() {
    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState('');
    const [color, setColor] = React.useState('#fff');
    const colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857',
    ];
    React.useEffect(() => {
        fetch('https://type.fit/api/quotes')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setQuotes(data);
                let randIndex = Math.floor(Math.random() * data.length);
                let randColorIndex = Math.floor(Math.random() * colors.length);
                setRandomQuote(data[randIndex]);
                setColor(colors[randColorIndex]);
            })
            .catch((err) => console.log(err));
    }, []);
    const generateQuote = () => {
        let randColorIndex = Math.floor(Math.random() * colors.length);
        let randIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randIndex]);
        setColor(colors[randColorIndex]);
    };
    return (
        <div style={{ backgroundColor: color, height: '100vh' }}>
            <div className="container center-screen">
                <div className="card" id="quote-box">
                    <div className="card-header">Inspirational Quotes</div>
                    <div className="card-body">
                        {randomQuote ? (
                            <>
                                <p className="card-text" id="text">
                                    &quot;{randomQuote.text}&quot;
                                </p>
                                <h5 className="card-title" id="author">
                                    ~{randomQuote.author || 'Unknown'}
                                </h5>
                            </>
                        ) : (
                            <h2>Loading</h2>
                        )}
                        <div className="col-md-12">
                            <button
                                id="new-quote"
                                className="btn btn-primary"
                                onClick={generateQuote}
                            >
                                New Quote
                            </button>
                            <a
                                id="tweet-quote"
                                href={
                                    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                                    encodeURIComponent(
                                        '"' +
                                            randomQuote.text +
                                            '" ' +
                                            randomQuote.author
                                    )
                                }
                                className="btn btn-danger"
                            >
                                <i class="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                            <a
                                id="tumblr-quote"
                                href={
                                    'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
                                    encodeURIComponent(randomQuote.author) +
                                    '&content=' +
                                    encodeURIComponent(randomQuote.text) +
                                    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
                                }
                                className="btn btn-warning"
                            >
                                <i class="fa fa-tumblr" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));
