const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());


const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});


db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            city TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            supplier_id INTEGER,
            product_name TEXT,
            quantity INTEGER,
            price REAL,
            FOREIGN KEY (supplier_id) REFERENCES Suppliers(id)
        )
    `);
});


app.post('/supplier', (req, res) => {
    const { name, city } = req.body;

    db.run(
        `INSERT INTO Suppliers (name, city) VALUES (?, ?)`,
        [name, city],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, name, city });
        }
    );
});


app.post('/inventory', (req, res) => {
    const { supplier_id, product_name, quantity, price } = req.body;

    if (quantity < 0) {
        return res.status(400).json({ message: "Quantity must be >= 0" });
    }

    if (price <= 0) {
        return res.status(400).json({ message: "Price must be > 0" });
    }


    db.get(`SELECT * FROM Suppliers WHERE id = ?`, [supplier_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(400).json({ message: "Supplier not found" });
        }

        db.run(
            `INSERT INTO Inventory (supplier_id, product_name, quantity, price)
             VALUES (?, ?, ?, ?)`,
            [supplier_id, product_name, quantity, price],
            function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({
                    id: this.lastID,
                    supplier_id,
                    product_name,
                    quantity,
                    price
                });
            }
        );
    });
});


app.get('/inventory', (req, res) => {
    db.all(`SELECT * FROM Inventory`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


app.get('/inventory-summary', (req, res) => {
    db.all(`
        SELECT 
            Suppliers.id,
            Suppliers.name,
            SUM(Inventory.quantity * Inventory.price) AS total_value
        FROM Inventory
        JOIN Suppliers ON Inventory.supplier_id = Suppliers.id
        GROUP BY Suppliers.id
        ORDER BY total_value DESC
    `, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});