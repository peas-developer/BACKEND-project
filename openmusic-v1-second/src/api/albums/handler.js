const autoBind = require('auto-bind')

class AlbumsHandler {
    constructor(service, validator){
        this._service = service
        this._validator = validator

        autoBind(this)
    }

    async postAlbumByIdHandler(req, h){
        
        this._validator.validateAlbumsPayload(req.payload)
        const {name, year} = req.payload
        const albumId = await this._service.addAlbum({name, year})
        return h.response({
            status: 'success',
            data: {
                albumId
            }
        }).code(201)
        
    }

    async getAlbumByIdHandler(req, h){
           
        const album = await this._service.getAlbumById(req.params.id)
        
        return h.response({
            status: 'success',
            data: {
                album
            }
        }).code(200)
 
    }

    async putAlbumByIdHandler(req){
        
        this._validator.validateAlbumsPayload(req.payload)
        const {name, year} = req.payload
        await this._service.editAlbumById(req.params.id, {name, year})
        return {
            status: 'success',
            message: 'Album berhasil diubah'
        }
        
    }

    async deleteAlbumByIdHandler(req){
        
        await this._service.deleteAlbumById(req.params.id)
        return {
            status: 'success',
            message: 'Album berhasil dihapus'
        }        
        
    }
}

module.exports = AlbumsHandler