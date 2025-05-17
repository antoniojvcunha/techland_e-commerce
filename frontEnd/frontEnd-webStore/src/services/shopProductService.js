const API_URL = "http://localhost:3000/api";

async function fetchAllProductsService() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}

async function fetchProductsByCategoryService(categoryName) {
  try {
    const response = await fetch(
      `${API_URL}/products/category/${categoryName}`
    );
    if (!response.ok) {
      throw new Error("Error fetching products by category");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}

async function fetchProductsByIdService(id) {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Error no fetchProductByIdService");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error on fetchProductByIdService:", error);
    throw error;
  }
}

export default {
  fetchAllProductsService,
  fetchProductsByCategoryService,
  fetchProductsByIdService,
};
