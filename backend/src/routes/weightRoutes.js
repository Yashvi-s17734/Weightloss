const express = require("express");
const router = express.Router();
const weightController = require("../controllers/weightController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/", authMiddleware, weightController.addWeight);
router.get("/", authMiddleware, weightController.getWeights);
module.exports = router;
