const path = require('path');
app.use(express.static(path.join(__dirname)));

app.get('/customerHomePage', (req, res) => {
    res.sendFile(path.join(__dirname, 'customerHomePage.html'));
});