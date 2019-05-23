export default function auth ({ next, store }){
 if(!store.getters.auth.loggedIn){
     return next({
        name: 'login'
     })
 }

 return next()
}