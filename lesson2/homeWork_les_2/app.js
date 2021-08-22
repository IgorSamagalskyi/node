const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');


const {PORT} = require('./config/variables');
const users = require('./db/users');
const usersPath = path.join(__dirname, 'db', 'users.js');
const staticPath = path.join(__dirname, 'static');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


app.listen(PORT, () => {
    console.log('app listen ', PORT)
})


app.get('/', (req, res) => {
    res.render('index.hbs');
});


//login
app.get('/login', (req, res) => {
    res.render('login.hbs', {users});
});

app.post('/login', (req, res) => {

    const {name, password} = req.body;
    const nameUser = users.find(user => user.name === name);
    const namePassword = users.find(user => user.password === password);

    try {
        if (namePassword.name && nameUser.password) {
            res.redirect('/calculator')
        }
        res.redirect('/register')
    } catch {
        res.redirect('/register')
    }


});


//register
app.get('/register', (req, res) => {
    res.render('register.hbs');
});

app.post('/register', (req, res) => {

    try {
        users.push(req.body);
        fs.writeFile(usersPath, `module.exports = ${JSON.stringify(users)}`, err => {
            if (err) {
                console.log(err1);
                return;
            }
        });
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
});


//calculator
app.get('/calculator', (req, res) => {
    res.render('calculator.hbs');
});


//test page
app.get('/ping', (req, res) => {
    res.json('Pong')
});