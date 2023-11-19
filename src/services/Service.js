import axios from "axios";
import React from "react";

const JEWELRIES_API_BASE_URL = "http://localhost:8000/api/jewelries";
const USERS_API_BASE_URL = "http://localhost:8000/api/users";

class Service {
    getJewelries(){
        return axios.get(JEWELRIES_API_BASE_URL); //response
    }
    getUsers(){
        return axios.get(USERS_API_BASE_URL); //response
    }
    getJewelry(id) {
        const url = `http://localhost:8000/api/getJewelry/${id}`;
        return axios.get(url);
    }
    getCategory(){
        return axios.get("http://localhost:8000/api/category");
    }
    updateJewelry(id, updatedJewelry){
        return axios.put(`http://localhost:8000/api/updateJewelry/${id}`, updatedJewelry)
    }
    deleteJewelry(id){
        return axios.delete(`http://localhost:8000/api/deleteJewelry/${id}`)
    }
    
}

export default new Service();