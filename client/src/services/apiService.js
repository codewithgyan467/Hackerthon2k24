// client/src/services/apiService.js
import axios from 'axios';

// Set the base URL for your API
const API_URL = 'http://localhost:5000/api'; // Adjust the port if needed

// Example function to get services
export const getServices = async () => {
    try {
        const response = await axios.get(`${API_URL}/services`);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

// Example function to create a new user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Add more functions as needed for your application
