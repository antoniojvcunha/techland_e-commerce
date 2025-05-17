const getAllNovelties = require('../services/noveltieService');

async function getNovelties(req, res) {
  try {
    const novelties = await getAllNovelties.getAllNovelties();
    res.json(novelties);
  } catch (error) {
    console.error("Error fetching novelties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getNovelties };
