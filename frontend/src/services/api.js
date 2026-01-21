const API_URL = "https://weightloss-oj47.onrender.com/api";
export const signup = async (data) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
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
  return res.json();
};

export const getWeights = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/weights`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
