const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");
class CourseController {
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((detailCourse) => {
        res.render("courses/detail", {
          detailCourse: mongooseToObject(detailCourse),
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    res.render("courses/create");
  }
  store(req, res, next) {
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    // C1
    // const courseWillCreate = new Course(formData)
    // courseWillCreate.save()

    // C2
    Course.create(formData)

      .then(() => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }
  edit(req, res, next) {
    Course.findById(req.params.id).then((course) => {
      res.render("courses/edit", { course: mongooseToObject(course) });
    });
  }
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/me/stored/courses");
      })
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
    // Course.updateOne(
    //   { _id: req.params.id },
    //   { deleted: false} // Cập nhật lại trạng thái
    // )
    //   .then(() => res.redirect('/me/stored/courses'))
    //   .catch(next);
  }
  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  forceDestroy(req, res, next) {
    Course.deleteOne({_id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next)
  }

}
module.exports = new CourseController();
