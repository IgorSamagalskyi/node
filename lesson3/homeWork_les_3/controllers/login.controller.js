const users = require('../db/users');


module.exports = {
    getLogin: (req, res) => {
        res.render('login.hbs', {users});
    },

    postLogin: (req, res) => {
        const {name, password} = req.body;
        const nameUser = users.find(user => user.name === name);
        const namePassword = users.find(user => user.password === password);

        try {
            if (nameUser.name && namePassword.password) {
                const userId = users.findIndex((user, i) => {
                    if (nameUser.name === user.name && nameUser.password === user.password) {
                        i += 1;
                        i === 1 ? i : i - 1;
                        return i;
                    }
                });
                res.redirect(`/users/${userId}`)
            }
        } catch {
            res.json('Register, or enter the correct password and name');
        }
    }
};
