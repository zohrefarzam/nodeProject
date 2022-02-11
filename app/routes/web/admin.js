const express = require("express");
const router = express.Router();

// Controllers
const adminController = require("app/http/controllers/admin/adminController");
const courseController = require("app/http/controllers/admin/courseController");
const episodeController = require("app/http/controllers/admin/episodeController");

// validators
const courseValidator = require("app/http/validators/courseValidator");
const episodeValidator = require("app/http/validators/episodeValidator");
// Helpers
const upload = require("app/helpers/uploadImage");

// Middlewares
const convertFileToField = require("app/http/middleware/convertFileToField");

router.use((req, res, next) => {
  res.locals.layout = "admin/master";
  next();
});

// Admin Routes
router.get("/", adminController.index);

//course route
router.get("/courses", courseController.index);
router.get("/courses/create", courseController.create);
router.post(
  "/courses/create",
  upload.single("images"),
  convertFileToField.handle,
  courseValidator.handle(),
  courseController.store
);
router.get("/courses/:id/edit", courseController.edit);
router.put(
  "/courses/:id",
  upload.single("images"),
  convertFileToField.handle,
  courseValidator.handle(),
  courseController.update
);
router.delete("/courses/:id", courseController.destroy);

//episode route
router.get("/episodes", episodeController.index);
router.get("/episodes/create", episodeController.create);
router.post(
  "/episodes/create",
  episodeValidator.handle(),
  episodeController.store
);
router.get("/episodes/:id/edit", episodeController.edit);
router.put(
  "/episodes/:id",
  episodeValidator.handle(),
  episodeController.update
);
router.delete("/episodes/:id", episodeController.destroy);

router.get('/comments/approved')
router.get('/comments/approved')

module.exports = router;
