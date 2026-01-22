const API_URL = "https://weightloss-oj47.onrender.com/api";

const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } else {
    throw new Error("Server error. Please try again.");
  }
};

export const signup = async (data) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const login = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const addWeight = async (data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/weights`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getWeights = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/weights`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};
