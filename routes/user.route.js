const userController = require('../controllers/user.controller')

module.exports = function (app){
    app.route('/user').get(userController.getUsers)
}