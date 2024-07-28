//Define the API URL
const apiUrl = 'https://api.scryfall.com/cards/named?exact='

// Make a GET request
function getCard() {
    const outputElement = document.getElementById('output');
    const cardPicture = document.getElementById('cardPic');
    const cardReleased = document.getElementById('released');
    const cardPrice = document.getElementById('price');
    var cardName = document.getElementById('cardName').value;
    var apiUrlcard = apiUrl + cardName;
    fetch(apiUrlcard)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Data Not Found');
                }
                else if (response.status === 500) {
                    throw new Error('Server Error');
                }
                else {
                    throw new Error('Network Issue');
                }
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            cardPicture.src = data.image_uris.normal;
            outputElement.textContent = data.oracle_text;
            cardReleased.textContent = `Released on: ${data.released_at}`;
            cardPrice.textContent = `Latest Price: $${data.prices.usd} 💸`;
            var responseJSON = JSON.stringify(data, null, 2);
            console.log(responseJSON)
        })
        .catch(error => {
            console.error('Error', error);
        })
};