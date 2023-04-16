const mongoose=require('mongoose')

const configureDB=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/cafe-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('connected to DB')
    })
    .catch((err)=>{
        console.log('error connecting to DB', err)
    })
}

module.exports=configureDB