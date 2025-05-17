import { useState } from "react";
import { useLocation } from "wouter";
import { registerUser } from "../services/authService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [, navigate] = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      alert("Successfully registered!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-red-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-red-500">
          Register
        </h2>

        <input
          className="w-full mb-5 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full mb-5 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full mb-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="text-xs text-gray-600 mb-8">
          Password must be at least 8 characters long, including at least one
          uppercase letter, one lowercase letter, one number, and one special
          character.
        </p>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition-colors"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Register;
