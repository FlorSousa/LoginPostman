const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const session = require('express-session')

module.exports = { express, app, session }
let { Sequelize, SequelizeStore, sequelize, myStore, Users } = require("./sequelize")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', async(req, res) => {
    if (req.session.nivel == "ADM") { res.json({ "msg": "Home de Adm" }) } else if (req.session.nivel == "ALN") { res.json({ "msg": "Home de Aluno" }) } else res.json({ "msg": "Você precisa estar logado para continuar" })
})
app.get('/todos', async(req, res) => {
    if (req.session.nivel == "ADM") {
        const retorno = await Users.findAll({ where: { nivel: "ALN" } })
        console.log(retorno[0].login)
    }
})
app.post('/', async(req, res) => {

    let nome = req.body.nome;
    let senha = req.body.senha;
    const retorno = await Users.findOne({ where: { login: nome, senha: senha } })
    if (retorno == null) {
        res.json({ 'Erro': "Não existe esse usuario" })
    } else {
        req.session.userName = nome
        req.session.nivel = retorno.nivel;
        res.json({ 'msg': 'reload' })
            // res.redirect('/')
    }

})

app.listen(3000)

/*

   -----------------------* Lista de Usuarios *----------------------------
   Flor 123 ADM
   Peralta 999 ALN
   Santiago 3.14*r*r ALN
      


*/