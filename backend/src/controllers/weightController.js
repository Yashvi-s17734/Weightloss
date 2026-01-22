const Weight = require("../models/Weight");
exports.addWeight = async (req, res) => {
  const { date, weight, description } = req.body;
  if (!date || !weight)
    return res.status(400).json({ message: "Date and weight required" });
  if (weight <= 0)
    return res.status(400).json({ message: "Weight must be postive number" });
  try {
    await Weight.create({
      userId: req.userId,
      date,
      weight,
      description,
    });
    res.status(201).json({ message: "Weight added" });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Weight already for this date" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getWeights = async (req, res) => {
  console.log("Querying weights for userId:", req.userId);

  try {
    const weights = await Weight.findAll({
      where: { userId: req.userId },
      order: [["date", "ASC"]],
    });

    let prevWeight = null;

    const result = weights.map((w) => {
      const current = w.weight;
      const gainLoss =
        prevWeight !== null ? (current - prevWeight).toFixed(1) : null;

      prevWeight = current;

      return {
        id: w.id,
        date: w.date,
        weight: w.weight,
        gainLoss,
        createdAt: w.createdAt,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weights" });
  }
};
