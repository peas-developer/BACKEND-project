const autoBind = require('auto-bind')

class SongsHandler {
    constructor(service, validator){
        this._service = service,
        this._validator = validator

        autoBind(this)
    }
    
    async postSongHandler(req, h){
        
        this._validator.validateSongsPayload(req.payload)
        const {title, year, genre, performer, duration, albumId} = req.payload
        const songId = await this._service.addSong({
            title,
            year, 
            genre,
            performer,
            duration,
            albumId
        })
        return h.response({
            status: 'success',
            data: {
                songId
            }
        }).code(201)

    }

    async getSongsHandler(req){
        const songs = await this._service.getSongs(req.query)
        return {
            status: 'success',
            data: {
                songs
            }
        }
    }

    async getSongByIdHandler(req){
        
        const song = await this._service.getSongById(req.params.id)
        return {
            status: 'success',
            data: {
                song
            }
        }
        
    }

    async putSongByIdHandler(req){
        
        this._validator.validateSongsPayload(req.payload)
        
        const {title, year, performer, genre, duration, album_id} = req.payload
        await this._service.editSongById(req.params.id, {title, year, performer, genre, duration, album_id})
        return {
            status: 'success',
            message: 'Berhasil diperbarui'
        }
        
    }

    async deleteSongByIdHandler(req){
        
        await this._service.deleteSongById(req.params.id)
        return {
            status: 'success',
            message: 'Berhasil dihapus'
        }
        
    }
}

module.exports = SongsHandler