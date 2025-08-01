import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export const getAllPosts = () => axios.get(`${BaseURL}posts/`);

export const createPost = (postData) => axios.post(`${BaseURL}posts/`, postData);

export const getLikesForPost = (postId) => axios.get(`${BaseURL}/api/likes/?post=${postId}`);
export const likePost = (postId, token) =>
  axios.post(
    `${BaseURL}/api/likes/`,
    { post: postId },
    {
      headers: { Authorization: `Token ${token}` },
    }
  );

export const unlikePost = (likeId, token) => axios.delete(`${BaseURL}/api/likes/${likeId}/`, { headers : { Authorization : `Token ${token}`}, });

export const getCommentsForPost = (postId) =>  axios.get(`${BaseURL}/api/comments/?post=${postId}`);