const Course = require("../models/Course")
const{mongooseToObject} = require('../../util/mongoose')
class CourseController {
    show(req, res, next){
        Course.findOne({slug: req.params.slug})
            .then(detailCourse=>{
                res.render('detail', {detailCourse: mongooseToObject(detailCourse)}) 
            })
            .catch(next)
    }
}
module.exports = new CourseController