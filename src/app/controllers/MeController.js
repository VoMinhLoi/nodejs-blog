const { multipleMongooseToObject } = require("../../util/mongoose")
const Course = require("../models/Course")
class MeController {
// [GET] /me/stored/courses
    storedCourses(req, res, next){
        Course.find({})
            .then(courses => {
                res.render('me/stored-courses',{courses: multipleMongooseToObject(courses)})
            })
            .catch(next)
    }
    trashCourses(req, res, next){
        // Course.findWithDeleted({deleted:true}).lean() //lean(): sẽ trả về một plain JavaScript object thay vì một Mongoose document.
        //     .then(courses => {
        //         console.log("---------")
        //         res.render('me/trash-courses',{courses: courses})
        //     })
        //     .catch(next)
        Course.findWithDeleted({deleted:true})
            .then(courses => {
                res.render('me/trash-courses',{courses: multipleMongooseToObject(courses)})
            })
            .catch(next)
    }
}
module.exports = new MeController