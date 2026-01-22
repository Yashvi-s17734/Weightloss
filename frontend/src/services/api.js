const API_URL = "https://weightloss-oj47.onrender.com/api";

const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type");

  if (res.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Session expired. Please login again.");
  }

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

// Helper to retry on wake-up 401
const fetchWithRetry = async (url, options, retries = 3, delayMs = 10000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      return await handleResponse(res);
    } catch (err) {
      if (err.message.includes("Session expired") && i < retries - 1) {
        console.log(
          `401 detected, retrying in ${delayMs / 1000}s... (${i + 1}/${retries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw err;
    }
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
  if (!token) throw new Error("No token found");

  return fetchWithRetry(`${API_URL}/weights`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const getWeights = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  return fetchWithRetry(`${API_URL}/weights`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
