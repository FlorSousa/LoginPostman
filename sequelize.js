let { express, app, session } = require('./index.js')
let Sequelize = require('sequelize')
let SequelizeStore = require('connect-session-sequelize')(session.Store)

const sequelize = new Sequelize('tester', 'root', 'senha', {
    host: 'localhost',
    dialect: 'mysql',
    storage: './session.sqlite'
})

const myStore = new SequelizeStore({
    db: sequelize
})

app.use(session({
    secret: "segredo",
    store: myStore,
    resave: false,
    proxy: false,
    saveUninitialized: true
}))

const Users = sequelize.define('users', {
    login: {
        type: Sequelize.STRING(100)
    },
    senha: {
        type: Sequelize.STRING(20)
    },
    nivel: {
        type: Sequelize.STRING(3)
    }
})

Users.sync({ force: true });
myStore.sync({ force: true });

module.exports = { Sequelize, SequelizeStore, sequelize, myStore, Users }