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
        res.redirect("/");
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
}
module.exports = new CourseController();
