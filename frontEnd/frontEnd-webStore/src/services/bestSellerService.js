async function fetchBestSellers() {
    try {
        const response = await fetch('http://localhost:3000/api/products/best-sellers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      throw error;
    }
}

export default fetchBestSellers;