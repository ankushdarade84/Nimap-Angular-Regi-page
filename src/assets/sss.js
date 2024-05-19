// server.js// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const DATABASE_FILE = 'db.json';

// API to get all registrations
app.get('/users', (req, res) => {
    fs.readFile(DATABASE_FILE, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading database.');
            return;
        }
        const registrations = JSON.parse(data);
        res.json(registrations);
    });
});

// API to add a new registration
// app.post('/users', (req, res) => {
//     fs.readFile(DATABASE_FILE, (err, data) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error reading database.');
//             return;
//         }
//         let registrations = JSON.parse(data);
//         registrations.push(req.body);
//         fs.writeFile(DATABASE_FILE, JSON.stringify(registrations, null, 2), err => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send('Error writing to database.');
//                 return;
//             }
//             res.status(201).send('Registration saved successfully.');
//         });
//     });
// });

app.post('/users', (req, res) => {
    try {
      const userData = req.body;
      const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
      db.registrations.push(userData); // Ensure registrations is an array
      fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
