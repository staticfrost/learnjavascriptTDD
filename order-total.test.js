const orderTotal = require('./order-total')

it('calls vatapi.com conrrectly', () => {
    let isFakeFetchCalled = false
    const fakeProcess = {
        env: {
            VAT_API_KEY: 'key123'
        }
    }
    // first attempt at mocking up a fetch request. This is  now done via fakeFetch2, with jest's mock
    // const fakeFetch = (url, opts) => {
    //     expect(opts.headers.apikey).toBe('key123')
    //     expect(url).toBe('https://vatapi.com/v1/country-code-check?code=DE')
    //     return Promise.resolve({
    //         json: () => Promise.resolve({
    //             rates: {
    //                 standard: {
    //                     value: 19
    //                 }
    //             }
    //         })
    //     })
    // }
    const fakeFetch2 = jest.fn().mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({
            rates: {
                standard: {
                    value: 19
                }
            }
        })
    }))
    return orderTotal(fakeFetch2, fakeProcess, {
        country: 'DE',
        items: [
            { 'name': 'Dragon waffles', price: 20, quantity: 2 }
        ]
    }).then(result => {
        expect(result).toBe(20*2*1.19)
        expect(fakeFetch2).toBeCalledWith('https://vatapi.com/v1/country-code-check?code=DE', 
        {  "headers": { "apikey" : "key123"} }
    )
    })
})

it('Quantity', () => 
    orderTotal(null, null, {
        items: [
            { 'name': 'Dragon candy', price: 2, quantity: 3 }
        ]
    }).then(result => expect(result).toBe(6)))

it('No quanity specified', () =>
    orderTotal(null, null, {
        items: [
            { 'name': 'Dragon candy', price: 3 }
    ]
    }).then(result => expect(result).toBe(3)))

it('Happy path (Example 1)', () =>
    orderTotal(null, null, {
        items: [
            { name: 'Dragon food', price: 8, quantity: 1},
            { name: 'Dragon cage (small)', price: 800, quantity: 1}
        ]
    }).then(result => expect(result).toBe(808)))

it('Happy path (Example 2)', () => 
    orderTotal(null, null, {
        items: [
            { name: 'Dragon collar', price: 20, quantity: 1},
            { name: 'Dragon chew toy', price: 40, quantity: 1}
        ]
    }).then(result => expect(result).toBe(60)))
