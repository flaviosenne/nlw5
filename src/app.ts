import express from 'express'
import { createServer}from 'http'
import { Server, Socket}from 'socket.io'
import { routes} from './routes'
import path from 'path'
import './db'

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.set('views', path.join(__dirname, '..', 'public', 'html'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/pages/client', (req, res) => {
    res.render('client')
})
app.get('/pages/admin', (req, res) => {
    res.render('admin')
})

const http = createServer(app)
const io = new Server(http)

io.on('connection', (soccket: Socket) => {
    console.log('conectou ', soccket.id)
})

app.use(express.json())
app.use(routes)

export { http, io }