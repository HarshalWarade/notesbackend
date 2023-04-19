const express = require('express')
const port = 80;
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('assets'));
app.get('/', async function(req, res) {
    // for unauthenticated home page
    return res.status(200).render('unhome');
});
app.get('/migratetoCreation', async (req, res) => {
    return res.status(200).render('createAccount');
});
app.listen(port, (error) => {
    if(error) {
        console.log(`Error occured: ${error}`);
    } else {
        console.log(`Running on: http://localhost:${port}`);
    }
});