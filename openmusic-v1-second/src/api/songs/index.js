const routes = require('./routes')
const SongsHandler = require('./handler')

module.exports = {
    name: 'Songs',
    version: '1.0.0',
    register: (server, {service, validator}) => {
        const songs = new SongsHandler(service, validator)
        server.route(routes(songs))
    }
}