import { baseURL } from "../api.js";



export const Get_User = async() => {
    const response = await fetch(`${baseURL}/users`, {
        headers: {
            Accept: "application/json",
            Credentials: "include",
        },
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) {
        const error = new Error(`Could not fetch the categories. Status: ${categoriesResponse.statusText}`);
        error.status = categoriesResponse.status;
        throw error;
    }
    const users = await response.json();

    return users;
}