const fs = require('fs');
const path = require('path');


const dirForFemale = path.join(__dirname, 'female_1800');
const dirForMale = path.join(__dirname, 'male_2000');

const sortGender = (pathFolder) => {
    fs.readdir(pathFolder, (err, files) => {
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

                const {gender} = JSON.parse(data.toString());

                if (gender === 'female') {
                    fs.rename(path.join(pathFolder, file), path.join(dirForFemale, file), (err) => {
                        if (err) {
                            console.error(err)
                            return;
                        }
                    });
                } else if (gender === 'male') {
                    fs.rename(path.join(pathFolder, file), path.join(dirForMale, file), (err) => {
                        if (err) {
                            console.error(err)
                            return;
                        }
                    });
                }

            })

        });
    })
};

sortGender(dirForFemale);
sortGender(dirForMale);
