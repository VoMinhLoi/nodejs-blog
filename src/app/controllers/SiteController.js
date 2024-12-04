const Course = require('../models/Course')
class SiteController {
    async index(req, res){
        // res.render('home')
        try {
            const courses = await Course.find({})
            res.json(courses)
        } catch (error) {
            res.status(400).json({error: 'ERROR!!!'})
        }

    }
    search(req, res){
        res.render('search')
    }
}
module.exports = new SiteController