const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Directory to store uploaded files

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', upload.single('profilePhoto'), (req, res) => {
  const user = req.body;
  if (req.file) {
    user.profilePhoto = `uploads/${req.file.filename}`;
  }
  fs.readFile('db.json', (err, data) => {
    if (err) throw err;
    let db = JSON.parse(data);
    user.id = db.users.length ? db.users[db.users.length - 1].id + 1 : 1;
    db.users.push(user);
    fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
      if (err) throw err;
      res.status(200).json(user);
    });
  });
});

app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
