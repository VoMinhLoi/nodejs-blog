const mongoose = require('mongoose')
function connect(){
    try {
        mongoose.connect('mongodb://localhost:27017/f8_education_dev',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('connect successfully')
    } catch (error) {
        console.log('connect failure')
        
    }    
}
module.exports = {connect}