const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        // server.get('/Login', (req, res) => {
        //     return app.render(req, res, '/Login', req.query)
        // })

        server.get('/', (req, res) => {
            return app.render(req, res, '/Login')
        })

        // server.get('/Signin/:id', (req, res) => {
        //     return app.render(req, res, '/Signin', { id: req.params.id })
        // })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
