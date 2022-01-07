const express = require('express');
const parse = require('nodemon/lib/cli/parse');
const request_promise = require('request-promise')

const app = express(); 
const PORT = process.env.PORT || 3000; 


const apiKey = "5ebee9954454c61d0cd8e5c53aa0da77"


const baseURL = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`; 


app.use(express.json())

app.get('/', (req, res) => {
        res.send("Welcome to amazon scrapper")
})
//Get Product Details
app.get('/products/:productId', async (req, res ) => {
    const { productId } = req.params; 
    
    try {
        const response = await request_promise(`${baseURL}&url=https://www.amazon.com/dp/${productId} `)
        
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})
//Get Product Reviews
app.get('/products/:productId/reviews', async (req, res ) => {
    const { productId } = req.params; 
 
    try {
        const response = await request_promise(`${baseURL}&url=https://www.amazon.com/product-reviews/${productId} `)
        
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

//Get Search Result - 
app.get('/search/:searchQuery', async (req, res ) => {
    const { searchQuery } = req.params; 

    try {
        const response = await request_promise(`${baseURL}&url=https://www.amazon.com/s?k=${searchQuery} `)
        
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})





app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))