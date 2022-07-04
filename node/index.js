const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

const config = {
    host: 'db',
    user: 'root',
    password: 'senhateste',
    database: 'nodedb'
}
const connection = mysql.createConnection(config)

connection.query(`CREATE TABLE IF NOT EXISTS people (id int auto_increment, name varchar(255), primary key(id))`)


const sql = `INSERT INTO people (name) VALUES ('Samuel Porto')`
connection.query(sql)

let html = '';
connection.query(`SELECT * FROM people`, (err, result, fields) => {
    if (err) throw err;

    Object.keys(result).forEach(function(key) {
        html += `<li>${result[key].name}</li>`
    })
})
connection.end()

app.get('/', (req, res) => {
    res.send(`<h1>Full Cycle Rocks</h1>
    <hr>
    <ul>${html}</ul>`)
})

app.listen(port, () => {
    console.log('rodando na porta '+port);
})