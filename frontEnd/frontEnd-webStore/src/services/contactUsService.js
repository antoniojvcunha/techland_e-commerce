const sendContactMessage = async (formData) => {
    try {
      const res = await fetch("http://localhost:3000/api/contactus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        throw new Error("Failed to send contact message");
      }
  
      return await res.json();
    } catch (error) {
      console.error("ContactService error:", error);
      throw error;
    }
  };
  
  export default sendContactMessage;
  