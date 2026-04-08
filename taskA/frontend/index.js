let searchInputEl = document.getElementById('searchInput');
let categoryFilterEl = document.getElementById("categoryFilter");
let minPriceEl = document.getElementById("minPrice");
let maxPriceEl = document.getElementById("maxPrice");
let resultsTableBodyEl = document.getElementById("resultsTableBody");
const BaseURL = 'https://assigmentzeerostock.onrender.com';

async function fetchProducts() {
    let searchVal = searchInputEl.value;
    let categoryVal = categoryFilterEl.value;
    let minPriceValue = minPriceEl.value;
    let maxPriceValue = maxPriceEl.value;

    if (minPriceValue && maxPriceValue && parseInt(minPriceValue) > parseInt(maxPriceValue)) {
        alert("Min price cannot be greater than max price.");
        return;
    }

    let query = `?q=${searchVal}&category=${categoryVal}&minPrice=${minPriceValue}&maxPrice=${maxPriceValue}`;
    try {
        let response = await fetch(`${BaseURL}/search${query}`);
        let data = await response.json();
        displayProducts(data)
    } catch (error) {
        console.log("Error fetching products:", error);
    }
}

function displayProducts(products) {
    resultsTableBodyEl.innerHTML = '';
    if (products.length === 0) {
        resultsTableBodyEl.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">No results found</td>
            </tr>
        `;
        return;
    }

    products.forEach((eachProduct, index) => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${eachProduct.name}</td>
            <td>${eachProduct.category}</td>
            <td>$${eachProduct.price.toFixed(2)}</td>
        `;
        resultsTableBodyEl.appendChild(row);
    })
}

searchInputEl.addEventListener('input', fetchProducts);
categoryFilterEl.addEventListener('change', fetchProducts);
minPriceEl.addEventListener("input", fetchProducts);
maxPriceEl.addEventListener('input', fetchProducts);

fetchProducts();
