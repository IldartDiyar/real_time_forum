import { baseURL } from "../api.js";

export const check_auth = async() => {

    const response = await fetch(`${baseURL}/check-user`, {
        headers: {
            'Accept': 'application/json',
            'Credentials': 'include'
        },
        method: "GET",
        credentials: 'include',
    })
    if (!response.ok) {
        if (response.status === 401) {
            return null;
        } else {
            throw new Error("Response error: " + response.status);
        }
    } else if (response.ok) {
        const data = await response.json();
        if (data) {
            return data
        } else {
            const error = new Error("Error while getting userdata from the server"); // Very unlikely to happen
            error.status = 500;
            throw error;
        }
    }
}