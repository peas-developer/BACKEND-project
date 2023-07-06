const InvaritantError = require('../error/InvariantError')
const NotFoundError = require('../error/NotFoundError')
const {nanoid} = require('nanoid')
const {Pool} = require('pg')

class AlbumsService {
    constructor(){
        this._pool = new Pool()
    }

    async addAlbum({name, year}){
        const id = nanoid(16)
        const result = await this._pool.query({
            text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
            values: [id,name, year]
        })

        if(!result.rows[0].id) throw new InvaritantError('Gagal menambahkan album')

        return result.rows[0].id
    }

    async getAlbumById(id){
        const result2 = await this._pool.query({
            text: 'SELECT id,title,performer FROM songs WHERE album_id=$1',
            values: [id]
        })
        
        const result = await this._pool.query({
            text: 'SELECT * FROM albums WHERE id=$1',
            values: [id]
        })

        if(!result.rows.length) throw new NotFoundError('Tidak dapat menemukan album dengan id tersebut')

        return {
            ...result.rows[0],
            songs : result2.rows
        }
    }

    async editAlbumById(id, {name, year}){
        const result = await this._pool.query({
            text: 'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING id',
            values: [name, year, id]
        })

        if(!result.rows.length) throw new NotFoundError('Tidak dapat menemukan album dengan id tersebut')
    }

    async deleteAlbumById(id){
        const result = await this._pool.query({
            text: 'DELETE FROM albums WHERE id=$1 RETURNING id',
            values: [id]
        })

        if(!result.rows.length) throw new NotFoundError('Tidak dapat menemukan album dengan id tersebut')
    }
}

module.exports = AlbumsService