const productService = require("../services/productService")

async function index(req, res) {
    try {
        const products = await productService.getAllProducts();
    res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    
}

async function showProductById(req, res) {
    const id = +req.params.id;
    

    try {
        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal server error" });
    
    }
} 

async function showProductsByCategoryName(req, res) {
    const categoryName = req.params.categoryName;

    try {
        const products = await productService.getProductsByCategoryName(categoryName);

        if (!products) {
            return res.status(404).json({ message: "Products not found" });
        }

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function storeProduct(req, res) {
    const {
        name,
        description,
        price,
        image_url,
        category_id
    } = req.body;

    try {
        const product = await productService.insertProduct(name, description, price, image_url, category_id);

        if (!product) {
            return res.status(404).json({ message: "Product not found"});
        }

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        console.error("Error inserting productc:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateProduct(req, res) {
    const id = +req.params.id;
    const {
        name,
        description,
        price,
        image_url,
        category_id
    } = req.body;

    try {
        const product = await productService.updateProduct(id, name, description, price, image_url, category_id);

        if (!product) {
            return res.status(404).json({ message: "Product not found"});
        }

        res.status(201).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error("Error inserting productc:", error);
        res.status(500).json({ error: "Internal server error" });
    } 
}

async function destroyProduct(req, res) {
    const id = +req.params.id;

    try {
        const product = await productService.deleteProductById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found"});
        }

        res.status(201).json({
            message: "Product deleted successfully",
            product
        });

    } catch (error) {
        console.error("Error inserting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    index,
    showProductById,
    showProductsByCategoryName,
    storeProduct,
    updateProduct,
    destroyProduct
}