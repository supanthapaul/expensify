const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath));

// serve index.html for all paths
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
   console.log('Server is running')
});