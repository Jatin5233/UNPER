import { useState } from "react";
import api from "../lib/axios";

interface LoginData {
  username: string;
  role: string;
  additionalInfo?: {
    state?: string;
    district?: string;
  };
}

interface UseLoginProps {
  onLogin: (username: string, role: string, additionalInfo?: { state?: string; district?: string }) => void;
}

export const roles = [
  { value: "CEC", label: "Chief Election Commissioner" },
  { value: "EC", label: "Election Commissioner" },
  { value: "CEO", label: "Chief Electoral Officer (State)" },
  { value: "DEO", label: "District Election Officer" },
  { value: "RO", label: "Returning Officer" },
  { value: "BLO", label: "Booth Level Officer" },
  { value: "Citizen", label: "Citizen / Elector" },
];

export const states = [
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal"
];

export const districts = [
  "Andheri",
  "Banglore",
  "Koregaon",
  "Indira Nagar",
  "Thane"
];

export function useLogin({ onLogin }: UseLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CEO");
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const requiresStateDistrict = ["CEO", "DEO", "RO", "BLO"].includes(role);
  const requiresDistrict = ["DEO", "RO", "BLO"].includes(role);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        username,
        password,
        role,
        state,
        district
      };

      const res = await api.post("/auth/login", payload);

      const token = res.data?.data?.token;
      const user = res.data?.data?.user;

      if (!token) {
        throw new Error("No token received");
      }

      // Store JWT token
      localStorage.setItem("authToken", token);

      // Store user data including role
      const userData = {
        name: user?.name || username,
        role: user?.role || role,
        state: user?.state || state,
        district: user?.district || district
      };
      
      localStorage.setItem("user", JSON.stringify(userData));

      // Set authorization header for future API calls
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Pass user data to app state
      onLogin(
        userData.name,
        userData.role,
        {
          state: userData.state,
          district: userData.district
        }
      );
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    state,
    setState,
    district,
    setDistrict,
    loading,
    error,
    requiresStateDistrict,
    requiresDistrict,
    handleSubmit,
  };
}