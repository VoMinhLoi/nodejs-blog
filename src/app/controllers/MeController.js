const { multipleMongooseToObject } = require("../../util/mongoose")
const Course = require("../models/Course")
class MeController {
// [GET] /me/stored/courses
    storedCourses(req, res, next){
        // C1
        // Course.find({})
        //     .then(async (courses) => {
        //         // sẽ có lỗi vì server restore của thư viên mongoose-delete đã thực hiện xóa 2 trường delete, deletedAt thay vì cập nhật delete=false
        //         const deletedCourseNumber = await Course.countDocumentsDeleted()
        //         res.render('me/stored-courses',{courses: multipleMongooseToObject(courses), deletedCourseNumber})
        //     })
        //     .catch(next)
        let courseModel = Course.find({})
        // if(req.query.hasOwnProperty('_sort')){
        if(res.locals._sort.column)
            courseModel = courseModel.sort({
                [res.locals._sort.column]: res.locals._sort.type
            })
        // }
        // C2: nhanh hơn vì sẽ thực thi cả 2 Promise cùng lúc thay vì await đợi
        Promise.all([Course.countDocumentsDeleted(), courseModel])
            .then(([deletedCourseNumber, courses])=>{
                res.render('me/stored-courses',{courses: multipleMongooseToObject(courses), deletedCourseNumber})
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