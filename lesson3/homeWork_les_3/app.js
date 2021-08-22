//Домашка 2 уроку, зробив для себе і враховуючу, що це домашнє робиться на основі домашки 2 уроку.
// 1) Реєстрація
// 2) Логінація.
// 3) Список всіх юзерів.
//     Створити файлик з юзерами, який буде виступати в ролі бази данних.
//
//     При реєстрації юзер вводин логін та пороль і ви його данні дописуєте у файлик.
//     Якщо такий мейл вже є, то видаємо помилку.
//
//     При логінації юзер так само ввоить мейл та пароль і вам необхідно знайти юзера в файлі. Якщо такий мейлик з таким паролем є, то привіти юзера на платформі показати інформацію про нього та кнопочку, яка перекине нас на список всіх юзерів.
//     В інакшому випадку сказати, що необхідно реєструватись.
//
//     І відображення всіх юзерів це відповідно просто виведення списку вісх юзерів.
//
//     При реєстрації мейли не можуть повторюватись
// ------------------------------------------------------------------------------
// Завдання 3 уроку
// 1. Встановити Postman, розыбратися як працює. Проклікати все з лекції
// 2. встановити та налаштувати Linter
// 3. Виконати попереднє дз але тепер розбити по роутах, контроллерах, сервісах.
// ! Всю роботу з файлами винести в сервіси
// Спробуйте реалізувати без рендерів та hbs, працюйте з постманом
const express = require('express');
const app = express();
// --------------------------------------
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
// -------------------------------------------

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const {PORT} = require('./config/variables');
const usersPath = path.join(__dirname, 'db', 'users.js');
const staticPath = path.join(__dirname, 'static');

module.exports = {usersPath}

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


app.listen(PORT, () => {
    console.log('app listen ', PORT);
})


const {loginRouter, userRouter, registerRouter} = require('./router');

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/register', registerRouter)

app.get('/', (req, res) => res.render('index'))

//test page
app.get('/ping', (req, res) => res.json('Pong'));



