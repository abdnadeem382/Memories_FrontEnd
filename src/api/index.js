import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5000' })
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;

})

//const url = 'http://localhost:5000/posts';
//const url = 'https://memories-proj-app.herokuapp.com/posts'
export const fetchPosts = ()=> API.get('/posts');
export const fetchPostsBySearch = (searchQuery)=> API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost)=> API.post('/posts', newPost);
export const updatePost = (id, updatedPost)=> API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id)=> API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
