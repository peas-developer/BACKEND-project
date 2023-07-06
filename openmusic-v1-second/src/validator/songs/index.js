const {SongsPayloadSchema} = require('./schemaSongs')
const InvariantError = require('../../error/InvariantError')

const SongsValidator = {
    validateSongsPayload : (payload) => {
        const stat = SongsPayloadSchema.validate(payload)
        if(stat.error) throw new InvariantError(stat.error.message)
    }
}

module.exports = SongsValidator