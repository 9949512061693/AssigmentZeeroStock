# Task A – Inventory Search API + UI

## Search Logic Explanation

The search functionality is implemented in the backend using an in-memory array of product data.

When a request is made to the `/search` API, the following query parameters are used:

- `q` → filters products by name (partial match, case-insensitive)
- `category` → filters by product category
- `minPrice` → filters products with price greater than or equal to this value
- `maxPrice` → filters products with price less than or equal to this value

The filtering is done step-by-step:
1. Start with all products
2. Apply name filter (if provided)
3. Apply category filter (if provided)
4. Apply minimum price filter (if provided)
5. Apply maximum price filter (if provided)

If no filters are given, all products are returned.

The frontend sends these filters as query parameters and displays the filtered results in a table.

---

## Performance Improvement (For Large Datasets)

Currently, the filtering is done on an in-memory array, which works fine for small datasets.

For large datasets, a better approach would be:
- Use a database (like MongoDB or SQL)
- Add indexing on fields like `product_name`, `category`, and `price`

This would improve search speed and make the system more scalable and efficient.