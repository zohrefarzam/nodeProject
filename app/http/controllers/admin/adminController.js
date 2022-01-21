const controller = require('app/http/controllers/controller');

class courseController extends controller {
    index(req , res) {
        res.render('admin/index');
    }

}

module.exports = new courseController();