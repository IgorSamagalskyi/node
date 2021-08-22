const users = require('../db/users');


module.exports = {
    getUsers: (req, res) => {
        res.render('users.hbs', {users});
    },

    getUserId: (req, res) => {
        const {user_id} = req.params;
        const currentUser = users[user_id];

        if (!currentUser) {
            res.status(404).end('User Not Found');
            return;
        }
        res.render('currentUser.hbs', {currentUser});
    }
}
