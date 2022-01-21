const controller = require("app/http/controllers/controller");
const User = require("app/models/user");

class homeController extends controller {
  async index(req, res) {
    console.log(res.json(user));
    res.render("home/index");
  }
}

module.exports = new homeController();
