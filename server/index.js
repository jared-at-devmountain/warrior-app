const express = require('express')
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

const {seed, submitWarrior, submitWeapon, getPairs, pair} = require('./controller')

app.get('/seed', seed)
app.post('/submitwarrior', submitWarrior)
app.post('/submitweapon', submitWeapon)
app.get('/getpairs', getPairs)
app.post('/pair', pair)

app.listen(PORT, () => {console.log('listeing on port ' + PORT)})