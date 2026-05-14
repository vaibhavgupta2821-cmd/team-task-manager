const express = require("express");

const router = express.Router();

const {
  getDashboard,
} = require("../controllers/dashBoardController");

router.get("/", getDashboard);

module.exports = router;