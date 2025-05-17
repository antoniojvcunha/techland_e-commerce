const bestSellerService = require("../services/bestSellerService");

async function showBestSellers(req, res) {
    try {
        const bestSellersProducts = await bestSellerService.getBestSellers();
        res.json(bestSellersProducts);
    } catch (error) {
        console.error("Error fetching best sellers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    showBestSellers
}