import axios from '../axios'

const productsApi = {
    getAllCategories() {
        return axios.get('/api/product/get-all-categories');
    },


    updateCategories(body, JWT) {
        console.log('test updateCategories api : ', body, ' - ', JWT);

        const headers = {

            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT,
        }
        return axios.put(`/api/product/update-product-category`, body, {
            headers: headers,
            credentials: 'include',
            method: 'PUT'
        });
    },

    deleteCategory(categoryId, JWT) {
        console.log('test deleteCategory api : ', categoryId, ' - ', JWT);
        const headers = {

            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT,
        }
        return axios.delete(`/api/product/delete-category/${categoryId}`, {
            headers: headers,
            credentials: 'include',
            method: 'DELETE'
        });
    },

    addCategory(body, JWT) {
        console.log('test updateCategories api : ', body, ' - ', JWT);

        const headers = {

            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT,
        }
        return axios.post(`/api/product/create-product-category`, body, {
            headers: headers,
            credentials: 'include',
            method: 'POST'
        });
    },


    getAllProducts() {
        return axios.get('/api/product/get-all-products');

    },

    addProducts(body, JWT) {
        console.log('test addProducts api : ', body, ' - ', JWT);
        const headers = {

            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + JWT,
        }
        return axios.post(`/api/product/create-product`, body, {
            headers: headers,
            credentials: 'include',
            method: 'POST'
        });
    },

    updateProducts(body, JWT) {
        console.log('test addProducts api : ', body, ' - ', JWT);
        const headers = {

            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + JWT,
        }
        return axios.put(`/api/product/update-product`, body, {
            headers: headers,
            credentials: 'include',
            method: 'PUT'
        });
    },

    deleteProduct(productId, JWT) {
        console.log('test deleteCategory api : ', productId, ' - ', JWT);
        const headers = {

            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT,
        }
        return axios.delete(`/api/product/delete-product/${productId}`, {
            headers: headers,
            credentials: 'include',
            method: 'DELETE'
        });
    },

    getAllProductsPagination(page, categoryId) {
        console.log('page : ', page, ' -  category : ', categoryId);
        return axios.get('/api/product/get-products-pagination?page=' + page + '&categoryId=' + categoryId);

    },
}

export default productsApi;