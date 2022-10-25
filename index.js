const express = require('express')
const cors = require('cors')
const mongoose = require('./db.js')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
var corsConfig = {
  origin: true,
  credential: true
}


const personController = require('./controllers/personController');
const { extname } = require('path')

const port = 8080

const app = express()


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

app.use('/person', personController)


// app.use(cors({origin: '*'}))
// app.use(cors({credentials: true, origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003']}));
// app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





