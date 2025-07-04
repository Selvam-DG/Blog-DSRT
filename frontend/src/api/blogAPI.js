import axios from "axios";

const BaseURL = 'http://127.0.0.1:8000/api'

export const getAllPosts = () => axios.get(`${BaseURL}/posts/`);

getAllPosts() 
    .then( res => {
        console.log(res.data)
    })
    .catch(error => {

        console.log(error);
    })

// export const createPost = (postData) => axios.post(`${BaseURL}posts/`, postData);
