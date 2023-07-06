const Hapi = require('@hapi/hapi')
require('dotenv').config()
const ClientError = require('./error/ClientError')

// Albums
const albums = require('./api/albums')
const AlbumsService = require('./service/AlbumsService')
const albumsValidator = require('./validator/albums')

// Songs
const songs = require('./api/songs')
const SongsService = require('./service/SongsService')
const SongsValidator = require('./validator/songs')

const init =async () => {
    const server = Hapi.server({
        host: process.env.HOST,
        port: process.env.PORT,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })
    
    // Service Object
    const albumsService = new AlbumsService()
    const songsService = new SongsService()

    // Plugin Register
    await server.register([
        {
            plugin: albums,
            options: {
                service : albumsService,
                validator: albumsValidator
            }
        },
        {
            plugin: songs,
            options: {
                service: songsService,
                validator: SongsValidator
            }
        }
    ])

    server.ext('onPreResponse', (request, h) => {

        const { response } = request;

        if (response instanceof Error) {
     
            if (response instanceof ClientError) {
                return h.response({
                    status: 'fail',
                    message: response.message
                }).code(response.statusCode)
            }

            /*
                if (!response.isServer) {
                    return h.continue;
                }

                ini Kegunaannya apa ya tolong Penjelasan lebih detail nya
            */

            return h.response({
                status: 'error',
                message: 'Server Error'
            }).code(500)
        }  

        return h.continue;

    });

    server.start()
    console.log('server berjalan di', server.info.uri)
}

init()