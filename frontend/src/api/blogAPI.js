import axios from "axios";

const BaseURL = 'http://127.0.0.1:8000/api/'

export const getAllPosts = () => axios.get(`${BaseURL}posts/`);

export const createPost = (postData) => axios.post(`${BaseURL}posts/`, postData);


// axios.get("http://127.0.0.1:8000/api/posts/")
//   .then(res => console.log("Posts:", res.data))
//   .catch(err => console.log("Error fetching Posts: ", err));
// const postData = {
//     title:'Post1',
//     slug:'post1',
//     content:'This  is the content of the post'
// }

// const cp = createPost(postData);
