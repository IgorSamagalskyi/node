// Створив папку users, в ній сворив файл кожного юзера, потім посортував по статі і віку.
//Як видалити після цього всього папку users коли всі файли росприділені? воно видаляє її але спочатку видає помилку, що папка не пуста.
//Як зробити перевірку чи папка пуста?

const fs = require('fs');
const path = require('path');


const users = [
    {name: "Olya", gender: "female", age: 21},
    {name: "Valya", gender: "female", age: 22},
    {name: "Natasha", gender: "female", age: 23},
    {name: "Lena", gender: "female", age: 14},
    {name: "Ulya", gender: "female", age: 15},
    {name: "Vasya", gender: "male", age: 21},
    {name: "Petya", gender: "male", age: 22},
    {name: "Sasha", gender: "male", age: 23},
    {name: "Seryu", gender: "male", age: 14},
    {name: "Vitalik", gender: "male", age: 15}
]


// create dir users

fs.mkdir(path.join(__dirname, 'users'), err => {
    if (err) {
        console.error(err)
        return;
    }

//create and filling the files
    users.forEach(({name, gender, age}) => {

        const userPath = path.join(__dirname, 'users', `${name}.json`);
        const userTextInFile = `{"name": "${name}", "gender": "${gender}", "age": ${age}}`;

        fs.writeFile(userPath, userTextInFile, err => {
            if (err) {
                console.log(err);
                return;
            }
        })
    })

// //create files by age
    const mkDirWomanOlder20 = path.join(__dirname, 'womanOlder20');
    const mkDirWomanYounger20 = path.join(__dirname, 'womanYounger20');
    const mkDirManOlder20 = path.join(__dirname, 'manOlder20');
    const mkDirManYounger20 = path.join(__dirname, 'manYounger20');


    const arrDir = [mkDirManOlder20, mkDirManYounger20, mkDirWomanOlder20, mkDirWomanYounger20];

    arrDir.forEach(createDir => {
        fs.mkdir(createDir, err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    })


// sort file by gender and age
    const allUsersFiles = path.join(__dirname, 'users');

    const getAllFiles = (pathFolder) => {
        fs.readdir(pathFolder, (err, files = [1, 2]) => {
            if (err) {
                console.error(err);
                return;
            }

            files.forEach(file => {

                fs.readFile(path.join(pathFolder, file), (err, data) => {
                    if (err) {
                        console.error(err)
                        return;
                    }

                    const {gender, age} = JSON.parse(data.toString());


//sort female
                    if (gender === 'female') {
                        if (age > 20) {
                            fs.rename(path.join(pathFolder, file), path.join(mkDirWomanOlder20, file), (err) => {
                                if (err) {
                                    console.error(err)
                                    return;
                                }
                            });
                        } else if (age < 20) {
                            fs.rename(path.join(pathFolder, file), path.join(mkDirWomanYounger20, file), (err) => {
                                if (err) {
                                    console.error(err)
                                    return;
                                }
                            });
                        }
                    }
//sort male
                    if (gender === 'male') {
                        if (age > 20) {
                            fs.rename(path.join(pathFolder, file), path.join(mkDirManOlder20, file), (err) => {
                                if (err) {
                                    console.error(err)
                                    return;
                                }
                            });
                        } else if (age < 20) {
                            fs.rename(path.join(pathFolder, file), path.join(mkDirManYounger20, file), (err) => {
                                if (err) {
                                    console.error(err)
                                    return;
                                }
                            });
                        }
                    }


                })
            });
        })
    };

    getAllFiles(allUsersFiles);


})

//видалення папки users коли все посортовано
fs.rmdir(path.join(__dirname, 'users'), err => {
    if (err) {
        console.error(err)
        return;
    }
    console.log("deleted")
});