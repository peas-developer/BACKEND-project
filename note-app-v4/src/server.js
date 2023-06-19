
require('dotenv').config()
const Hapi = require('@hapi/hapi')

// Notes
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesServices');
const NoteValidator = require('./validator/notes')

// Users
const users = require('./api/users')
const UsersService = require('./services/postgres/UsersService')
const UserValidator = require('./validator/users')

const init = async () => {

    const notesService = new NotesService()
    const usersService = new UsersService()

    const server = Hapi.server({
        port : process.env.PORT,
        host : process.env.HOST,
        routes : {
            cors :{
                origin : ['*']
            }
        }
    })

    await server.register([
        {
            plugin : notes,
            options : {
                service : notesService,
                validator : NoteValidator
            }
        },
        {
            plugin : users,
            options : {
                service : usersService,
                validator : UserValidator
            }
        }
    ])

    await server.start()
    console.log('server berjalan di', server.info.uri)
}

init()

