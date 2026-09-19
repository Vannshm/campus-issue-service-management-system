const app = require('./src/app')
const connectDB = require('./src/DB/db')

connectDB()


app.listen(3000,()=>{
    console.log('App is listening on port: 3000...')
})