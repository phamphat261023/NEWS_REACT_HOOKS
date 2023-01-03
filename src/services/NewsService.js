import axios from "axios";

const getAllNews = () => {
  return axios.get("http://localhost:8081/news");
};

const createNews = (data) => {
  return axios.post("http://localhost:8081/news", data);
};

const updateNews = (id, data) => {
  return axios.put(`http://localhost:8081/news/${id}`, data);
};

export { getAllNews, createNews, updateNews };
