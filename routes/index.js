var express = require("express");
var router = express.Router();
require("dotenv").config();
var mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {});

let studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  diemToan: {
    type: Number,
  },
  diemLy: {
    type: Number,
  },
  diemHoa: {
    type: Number,
  },
});

let Student = mongoose.model("Student", studentSchema, "Student");

/* GET home page. */
router.get("/", function (req, res, next) {
  Student.find({})
    .then(function (data) {
      res.render("index", { student: data });
    })
    .catch(function (err) {
      console.error("Error fetching students:", err);
      next(err); // Pass the error to the next middleware
    });
});

router.get("/them", function (req, res, next) {
  res.render("them", {});
});

router.post("/them", function (req, res, next) {
  Student.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch(next);
});

router.get("/sua/:id", function (req, res, next) {
  Student.findById(req.params.id)
    .then(student => {
      res.render("sua", { student: student });
    })
    .catch(err => {
      console.error("Error fetching student:", err);
      next(err);
    });
});

router.post("/sua/:id", function (req, res, next) {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.error("Error updating student:", err);
      next(err);
    });
});

router.get("/xoa/:id", function (req, res, next) {
  Student.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch(next); 
});

module.exports = router;
