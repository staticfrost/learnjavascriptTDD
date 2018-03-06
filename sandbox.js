const fetch = require('node-fetch')
const orderTotal = require('./order-total')

const result = orderTotal(fetch, process, {
    country: 'DE',
    items: [
        { 'name': 'Dragon waffles', price: 20, quantity: 2 }
    ]
})
// const result = 
//     fetch('https://vatapi.com/v1/country-code-check?code=DE', {
//         headers: {'apikey' : '586b6a45f24446a6482d93af71d9e062'}})
//       .then(response => response.json())
//       .then(data => data.rates.standard.value)

result