
require('dotenv').config()
const Hapi = require('@hapi/hapi')
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesServices');
const NoteValidator = require('./validator/notes')

const init = async () => {

    const noteService = new NotesService()

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
                service : noteService,
                validator : NoteValidator
            }
        }
    ])

    await server.start()
    console.log('server berjalan di', server.info.uri)
}

init()

