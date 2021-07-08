const express = require('express');
const app = express();
const cors = require('cors')

//middleware
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());



//database config
const { Pool } = require('pg')
const pool = new Pool({
    user: 'brian',
    database: 'postgres',
    password: '12345',
   
})

//RESTFUL API

//READ INSERT DELETE UPDATE
//GET POST DELETE PUT 

//GET READ
app.get('/', async(req, res) => {
    const result = await pool.query('SELECT * FROM cats');
    res.send(result.rows)
})


//GET ONE 
//axios.get(`http://localhost:8080/${id}`)
app.get('/:id', async(req, res) => {
    const q = req.params
    console.log(q, req.query)
    const result = await pool.query('SELECT * FROM cats WHERE id = $1', [q.id])
    res.send(result.rows)
})


//POST INSERT
//axios.post('http://localhost:8080/post, {
//     "name": name,
//     "age" : age,
//     "color" : color,
// })
app.post('/post', (req, res) => {
    
    const q = req.body;
    console.log(q);
    const result = pool.query('INSERT INTO cats (name, age, color) VALUES ($1, $2, $3) RETURNING id', [q.name, q.age, q.color] , (err) => {
        if(err) {
            console.log(err)
            res.status(500)
        } else {
            console.log(res)
            res.send('success')
        }
    })
    return result
})


//PUT UPDATE
app.put('/put',(req, res) => {
    const q = req.body;
    console.log(q);
    const result = pool.query("UPDATE cats SET name=$1, age=$2, color=$3 WHERE id=$4",[q.name, q.age, q.color, q.id], (err) => {
        if(err) {
            console.log(err)
            res.status(500)
        } else {
            console.log(res)
            res.send('success')
        }
    })

    return result

})

//DELETE
app.delete('/delete/:id',(req, res) => {
    const q = req.params
    console.log(q);
    const result = pool.query("DELETE FROM cats WHERE id=$1",[q.id], (err) => {
        if(err) {
            console.log(err)
        } else {
            res.send('success');
        }
    })
    return result;
})

let PORT = process.env.PORT || 8080

app.listen(PORT, ()=> {
    console.log('server host in 8080')
})
