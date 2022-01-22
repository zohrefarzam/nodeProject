const controller = require("app/http/controllers/controller");
const Course = require("app/models/course");

class courseController extends controller {
  async index(req, res) {
    res.render("home/courses");
  }
  async single(req, res) {
    let course = await Course.findOne({ slug: req.params.course }).populate([
      { path: "user", select: "name" },
      {
        path: "episodes",
        options: {
          sort: { number: 1 },
        },
      },
    ]);
    res.render("home/single-course", { course });
  }
}

module.exports = new courseController();
