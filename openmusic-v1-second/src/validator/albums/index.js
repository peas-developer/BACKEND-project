const {AlbumsPayloadSchema} = require('./schemaAlbums')
const InvariantError = require('../../error/InvariantError')

const AlbumsValidator = {
    validateAlbumsPayload : (payload) => {
        const stat = AlbumsPayloadSchema.validate(payload)
        if (stat.error) throw new InvariantError(stat.error.message)
    }
}

module.exports = AlbumsValidator