const InvariantError = require('../error/InvariantError')
const NotFoundError = require('../error/NotFoundError')

const{Pool} = require('pg')
const {nanoid} = require('nanoid')

class SongsService {
    constructor(){
        this._pool = new Pool()
    }

    async addSong({title, year, performer, genre, duration, albumId}){
        const id = nanoid(16)

        const result = await this._pool.query({
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, year, performer, genre, duration, albumId]
        })

        if(!result.rows[0].id) throw new InvariantError('Gagal menambahkan lagu')

        return result.rows[0].id
    }

    async getSongs({title, performer}){

        const result = await this._pool.query('SELECT id,title,performer FROM songs')

        if(title !== undefined && performer !== undefined){
            return result.rows.filter((row) => row.title.toLowerCase().includes(title) && row.performer.toLowerCase().includes(performer))
        }else if(title !== undefined && performer === undefined){
            return result.rows.filter((row) => row.title.toLowerCase().includes(title))
        }else if(title === undefined && performer !== undefined){
            return result.rows.filter((row) => row.performer.toLowerCase().includes(performer))
        }

        return result.rows
    }

    async getSongById(id){
        const result = await this._pool.query({
            text: 'SELECT * FROM songs WHERE id=$1',
            values: [id]
        })

        if(!result.rows.length) throw new NotFoundError('tidak dapat menemukan lagu dengan id tersebut')

        return result.rows[0]
    }

    async editSongById(id, {title, year, performer, genre, duration, album_id}){
        const result = await this._pool.query({
            text: 'UPDATE songs SET title=$1, year=$2, performer=$3, genre=$4, duration=$5, album_id=$6 WHERE id=$7 RETURNING id',
            values: [title, year, performer, genre, duration, album_id, id]
        })

        if(!result.rows.length) throw new NotFoundError('tidak dapat menemukan lagu dengan id tersebut')
    }

    async deleteSongById(id){
        const result = await this._pool.query({
            text: 'DELETE FROM songs WHERE id=$1 RETURNING id',
            values: [id]
        })

        if(!result.rows.length) throw new NotFoundError('tidak dapat menemukan lagu dengan id tersebut')
    }
}

module.exports = SongsService