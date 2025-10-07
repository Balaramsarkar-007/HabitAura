import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

// helper funtion to call apis
const apiCall = async (endpoint, options) => {
    try {
        const response = await axios(`${baseUrl}${endpoint}`, options);

        return response.data;
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
        const errorStatus = error.response?.status || 500;
        throw {
            message: errorMessage,
            status: errorStatus,
            isApiError: true
        };
    }
}

// API funtions
export const habitAPI = {

    // get current user
    getUser : async () => {
        return await apiCall('/api/auth/me', {
            method : 'GET'
        });
    },

    // get all habits of users
    getHabits : async () =>{
        return await apiCall('/api/habit/habits', {
            method : 'GET'
        })
    },

    // create new habit
    createHabit : async (habitData) => {
        return await apiCall('/api/habit/create', {
            method : 'POST',
            data : habitData
        })
    },

    // mark as done in habit
    markAsDone : async (data) => {
        return await apiCall('/api/habit/mark-as-done', {
            method : 'PUT',
            data : data
        })
    },

    // delete habit
    deleteHabit : async (id) => {
        return await apiCall('/api/habit/delete', {
            method : 'DELETE',
            data : { id }
        });
    },

    // edit habit
    editHabit : async (data) =>{
        return await apiCall('/api/habit/edit', {
            method : 'PUT',
            data : data
        })
    },

    // disable reminder
    disableReminder : async (id) => {
        return await apiCall('/api/habit/disable-reminder', {
            method : 'PUT',
            data : { id }
        })
    },

    // edit reminder
    editReminder : async (data) => {
        return await apiCall('/api/habit/edit-reminder', {
            method : 'PUT',
            data : data
        })
    },
}