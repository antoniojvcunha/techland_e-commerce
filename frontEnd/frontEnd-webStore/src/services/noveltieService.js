async function fetchNovelties() {
    try {
        const response = await fetch('http://localhost:3000/api/novelties');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching novelties:', error);
      throw error;
    }
}

export default fetchNovelties;