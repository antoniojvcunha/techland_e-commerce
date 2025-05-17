const router = require("express").Router();
const productController = require("../controllers/productController");
const bestSellerController = require("../controllers/bestSellerController");


router.get("/products/", productController.index);
router.get("/products/best-sellers", bestSellerController.showBestSellers);
router.get("/products/:id", productController.showProductById);
router.get("/products/category/:categoryName", productController.showProductsByCategoryName);
router.post("/products/", productController.storeProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.destroyProduct);

module.exports = router;