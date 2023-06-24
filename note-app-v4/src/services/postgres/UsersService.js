const {Pool} = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthenticationError = require('../../exceptions/AuthenticationError')
const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt')

class UsersService {
    constructor(){
        this._pool = new Pool()
    }

    async addUser({username, password, fullname}){
        await this.verifyNewUsername(username);

        const id = `user-${nanoid(16)}`
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await this._pool.query({
            text : 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
            values : [id, username, hashedPassword, fullname]
        })

        if(!result.rows.length) throw new InvariantError('User gagal ditambahkan')

        return result.rows[0].id
    }

    async verifyNewUsername(username) {
        const result = await this._pool.query({
            text : 'SELECT username FROM users WHERE username=$1',
            values : [username]
        })

        if(result.rows.length > 0) throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.')
    }

    async getUserById(userId){

        const result = await this._pool.query({
            text : 'SELECT id, username, fullname FROM users WHERE id=$1',
            values: [userId]
        })

        if(!result.rows.length) throw new NotFoundError('User tidak ditemukan')

        return result.rows[0]
    }

    async verifyUserCredential(username, password){
        const result = await this._pool.query({
            text: 'SELECT id, password FROM users WHERE username = $1',
            values : [username]
        })

        if(!result.rows.length) throw new AuthenticationError('Kredensial yang Anda berikan salah') // username salah

        const {id, password : hashedPassword} = result.rows[0] // memasukkan nilai password ke variable baru dgn nama hashedPassword

        const match = await bcrypt.compare(password, hashedPassword)

        if(!match) throw new AuthenticationError('Kredensial yang Anda berikan salah') // password salah

        return id
    }
}

module.exports = UsersService