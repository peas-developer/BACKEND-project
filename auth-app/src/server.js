const Hapi = require('@hapi/hapi')

const init = () => {

    const server = Hapi.server({
        host : 'localhost',
        port: 5000
    })

    

    server.start()
    console.log('server sedang berjalan di', server.info.uri)

}
init()