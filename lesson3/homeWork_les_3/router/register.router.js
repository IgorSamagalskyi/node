const router = require('express').Router();

const {registerController} = require('../controllers');

router.get('/', registerController.getRegister);
router.post('/', registerController.postRegister);

module.exports = router;






// const router = require('express').Router();
//
//
// router.get('/register', (req, res) => {
//     res.render('register');
// });
//
// router.post('/register', async (req, res) => {
//     try {
//         const user = users.find(user => user.email === req.body.email);
//
//         if (!user) {
//             users.push(req.body);
//             await promisify.writeFile(usersPath, `module.exports = ${JSON.stringify(users)}`, err => {
//                 console.log(users.email, 'tyt')
//                 if (err) {
//                     console.log(err1);
//                     return;
//                 }
//             });
//             res.redirect('/login')
//         }
//         res.json('such an email already exists');
//     } catch {
//         res.redirect('/register')
//     }
// });
//
// module.exports = router;
