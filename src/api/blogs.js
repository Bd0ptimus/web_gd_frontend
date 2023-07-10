import axios from '../axios'

const blogsApi = {
    createBlogs(body, JWT) {
        console.log('test addProducts api : ', body, ' - ', JWT);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT,
        }
        return axios.post(`/api/blog/create-blog`, body, {
            headers: headers,
            credentials: 'include',
            method: 'POST'
        });
    },
    getBlogs(id) {
        return axios.get('/api/blog/get-blog/' + id);
    },


}


export default blogsApi;