const http = require('http');
const app = require('./express')
var cron = require('node-cron');
const userController = require('./controllers/user.controller')


const PORT = process.env.PORT || 3000;

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server start on port: ${PORT}`)
})

userController.updateUsers()
cron.schedule('* * * * *', () => {
    userController.updateUsers()
});