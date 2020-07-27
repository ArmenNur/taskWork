const mongoose = require('mongoose');
const request = require('request');
const Users = mongoose.model('User');

exports.getUsers = (req, res) => {
    const search = new RegExp(req.query.search, 'gmi');
    Users.find({ $or: [{ first_name: { $regex: search } }, { last_name: { $regex: search } }] }, (err, users) => {
        if (err) {
            res.status(err.status || 500).send('Somthing went wrong');
        }
        res.json(users);
    })
}

exports.updateUsers = () => {
    request.get('https://reqres.in/api/users', (err, response, body) => {
        if (err) {
            console.log(err);
        }
        const bodyData = JSON.parse(body);
        const { data, total_pages } = bodyData;
        const promiseArr = [];
        for (let i = 2; i <= total_pages; i++) {
            let newPromise = new Promise((resolve, reject) => {
                request.get(`https://reqres.in/api/users?page=${i}`, (err, response, body) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(JSON.parse(body).data);
                })
            })
            promiseArr.push(newPromise);
        }
        Promise.all(promiseArr)
            .then(users => {
                for (let item of users) {
                    data.push(...item)
                }
                for (let item of data) {
                    const newUser = new Users(item)
                    newUser.save((err, user) => {
                        if (err && err.code != 11000) {
                            console.log(err)
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    })

}