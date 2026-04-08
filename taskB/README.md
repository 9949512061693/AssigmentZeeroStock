# Task B – Inventory Database + APIs

## Overview

This project is a simple inventory management backend where suppliers can add their products, and the system stores and retrieves inventory data. It also provides a summary of inventory grouped by supplier.

---

## Database Schema

Two tables are created:

### 1. Suppliers
- id (Primary Key)
- name
- city

### 2. Inventory
- id (Primary Key)
- supplier_id (Foreign Key)
- product_name
- quantity
- price

### Relationship
One supplier can have multiple inventory items.

---

## APIs

### 1. Add Supplier
**POST /supplier**

Adds a new supplier.

---

### 2. Add Inventory
**POST /inventory**

Adds a product for a supplier.

Validations:
- Supplier must exist
- Quantity must be ≥ 0
- Price must be > 0

---

### 3. Get Inventory
**GET /inventory**

Returns all inventory records.

---

### 4. Inventory Summary
**GET /inventory-summary**

Returns inventory grouped by supplier and sorted by total value.

Total value is calculated as:
quantity × price

---

## Why SQLite3?

SQLite3 is used because it is simple, lightweight, and easy to set up. It does not require a separate server and is perfect for small projects or assignments.

It also supports SQL features like tables, relationships, and queries, which makes it suitable for this task.

---

## Optimization Suggestion

For larger datasets, performance can be improved by adding an index on `supplier_id` in the Inventory table. This will make queries faster when filtering or grouping data.

---

## Conclusion

This project demonstrates basic backend development skills, including API creation, database design, validation handling, and SQL queries.