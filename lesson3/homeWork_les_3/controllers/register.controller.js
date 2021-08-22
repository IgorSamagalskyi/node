const users = require('../db/users');
const {usersPath} = require('../app');
const fs = require('fs');

module.exports = {
getRegister: (req, res) => {
    res.render('register');
},

    postRegister: (req, res) => {
    try {
        const user = users.find(user => user.email === req.body.email);

        if (!user) {
            users.push(req.body);
            fs.writeFile(usersPath, `module.exports = ${JSON.stringify(users)}`, err => {
                if (err) {
                    console.error(err)
                    return;
                }
            });
            res.redirect('/login')
        }
        res.json('such an email already exists')
    } catch {
        console.log('22334455')
        res.redirect('/register')
    }
}
};
