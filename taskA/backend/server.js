const express = require('express');
const cors = require('cors');
const app = express();

const products = require('./products');

app.use(cors());
app.use(express.json());

app.get('/search', (req, res) => {
    let { q, category, minPrice, maxPrice } = req.query;

    let filteredProducts = products;


    if (q) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(q.toLowerCase())
        );
    }

    if (category) {
        filteredProducts = filteredProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (minPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price >= parseFloat(minPrice)
        );
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product =>
            product.price <= parseFloat(maxPrice)
        );
    }

    res.json(filteredProducts);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

