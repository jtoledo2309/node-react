import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

client.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYWEyYzUwNi0zY2U2LTQyNmYtYTQ1NC0yOGE0MjBhNjRmYTIiLCJpYXQiOjE2NjczMzk2NDMsImV4cCI6MTY5ODg5NzI0M30.jvS4gw7av33Kju5Bp6ZqZcQkdf7zu6fAWmIfE4EBwfY";

client.interceptors.response.use((response) => response.data);

export default client;
