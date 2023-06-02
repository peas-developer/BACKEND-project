const route = [
    {
        method : 'GET',
        path : '/',
        handler : function (r,h) {
            console.log(r.query)
            const {name, location} = r.query
            return `${name} from ${location}`
        }
    },
    {
        method : '*',
        path : '/',
        handler : () => "Halaman tidak dapat diakses dengan method tersebut"
    },    
    {
        method : 'GET',
        path : '/about',
        handler : () => 'About Page'
    },
    {
        method : '*',
        path : '/about',
        handler : () => "Halaman tidak dapat diakses dengan method tersebut"
    },    
    {
        method : '*',
        path : '/{any*}',
        handler : function (r,h) {
            return h.response('Page Not Found').code(404)
        }
    },
    {
        method : 'GET',
        path : '/hello/{username?}',
        handler : (r,h) => {
            console.log(r.params)
            console.log(r.query)
            const {lang} = r.query
            const {username = 'stranger'} = r.params
            if(lang === 'id') return `Halo, ${username}`
            return `Hello, ${username}`
        }
    },
    {
        method : 'POST',
        path : '/login',
        handler : function (r,h) {
            const {username, password} = r.payload
            return `selamat kembali, ${username}`
        }
    }

]

module.exports = route