const mongoose = require('mongoose')
function connect(){
    try {
        // console.log("Biến môi trường: ", process.env.MONGODB_URI) phải cài thư viện dotev
        mongoose.connect('mongodb://localhost:27017/f8_education_dev'
            // ,{
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // }
        )
        console.log('connect successfully')
    } catch (error) {
        console.log('connect failure')
        
    }    
}
module.exports = {connect}