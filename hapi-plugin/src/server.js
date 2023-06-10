const Hapi = require('@hapi/hapi')
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesServices.js');
const NoteValidator = require('./validator/notes')

const init = async () => {

    const noteService = new NotesService()

    const server = Hapi.server({
        port : 5000,
        host : 'localhost'
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

