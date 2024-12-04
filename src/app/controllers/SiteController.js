const Course = require('../models/Course')
const {multipleMongooseToObject} = require('../../util/mongoose')
class SiteController {
    async index(req, res, next){
        // res.render('home')
        try {
            // const courses = await Course.find({})
            // res.json(courses)
            await Course.find({})
                .then(courses => {
                    
                    res.render('home',{courses: multipleMongooseToObject(courses)})
                })
                .catch(next)//error=>next(error)
            // res.json(courses)
        } catch (error) {
            res.status(400).json({error: 'ERROR!!!'})
        }

    }
    search(req, res){
        res.render('search')
    }
}
module.exports = new SiteController