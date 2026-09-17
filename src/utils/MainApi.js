const BASE_URL = "https://taskflow-backend-tpgr.onrender.com";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res
    .json()
    .then((err) =>
      Promise.reject(new Error(err.message || "Error en la petición")),
    );
};

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/api/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  }).then(handleResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/api/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

export const getCurrentUser = (token) => {
  return fetch(`${BASE_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
};

export const getTasks = (token) => {
  return fetch(`${BASE_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
};

export const createTask = (token, taskData) => {
  return fetch(`${BASE_URL}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  }).then(handleResponse);
};

export const updateTask = (token, taskId, taskData) => {
  return fetch(`${BASE_URL}/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  }).then(handleResponse);
};

export const deleteTask = (token, taskId) => {
  return fetch(`${BASE_URL}/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(handleResponse);
};
