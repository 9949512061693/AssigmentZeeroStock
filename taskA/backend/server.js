const express = require('express');
const cors = require('cors');
const app = express();

const products = require('./products');
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*'
}));
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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

