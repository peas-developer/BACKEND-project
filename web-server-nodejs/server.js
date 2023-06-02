/*

BODY REQUEST

const http = require('http')

const server = http.createServer((request, response) => {
    response.statusCode = 200
    response.setHeader('Content-Type','text/html')

    const {method} = request

    let body = []

    if(method === 'GET') {
        response.end(`<h1>${body}</h1>`)
    }

    if(method === 'POST') {
        request.on('data',(chunk) => {
            body.push(chunk)
        })

        request.on('end', () => {
            body = Buffer.concat(body).toString()
            response.end(`<h1>${body}</h1>`)
        })

    }
})
server.listen(port = 5000, host = 'localhost', () => {
    console.log(`Server berjalan pada http://${port}:${host}`)
})

*/



// ROUTING REQUEST => statusCode response, setHeader response with JSON

const http = require('http')

const server = http.createServer((request, response) => {
    response.setHeader('Content-Type','application/json')

    const {url} = request
    const {method} = request

    if(url === '/'){
        if(method === 'GET'){
            response.statusCode = 200
            response.end(JSON.stringify({
                message: 'ini adalah HOME page'
            }))
        }else{
            response.statusCode = 400
            response.end(JSON.stringify({
                message : `halaman ini tidak dapat diakses dengan ${method} request`
            }))
        }
    }else if(url === '/about'){
        if(method === 'GET'){
            response.statusCode = 200
            response.end(JSON.stringify({
                message : 'About Page'
            }))
        }else if(method === 'POST'){ 
            response.statusCode = 200
            let body = []
            request.on('data', (chunk) => body.push(chunk))
            request.on('end', () => response.end(`${Buffer.concat(body).toString()}`))
        }else{
            response.statusCode = 400
            response.end(JSON.stringify({
                message : `halaman ini tidak dapat diakses dengan ${method} request`
            }))
        }   
    }else {
        response.statusCode = 404
        response.end(JSON.stringify({
            message : `halaman tidak ditemukan`
        }))
    }
})

server.listen(port = 5000, host = 'localhost', () => {
    console.log(`Server sedang berjalan pada http://${host}:${port}`)
})



