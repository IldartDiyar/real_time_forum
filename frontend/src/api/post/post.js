import { baseURL } from "../api.js";

export const get_categories = async() => {
    const response = await fetch(`${baseURL}/categories`, {
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
    const categories = await response.json();
    return categories;
}

export const Create_Post_Handler = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('post-title');
    const category = formData.get('post-category');
    const content = formData.get('post-content');
    if (!title || !category || !content) {
        alert(`Create post error, some field is empty`);
        return
    }
    let category1 = [category]
    const NewPost = {
        title: title,
        description: content,
        category: category1
    }
    console.log(NewPost);
    const response = await fetch(`http://localhost:8080/api/v1/post/create`, {
        headers: {
            'Accept': 'text/plain',
            'Content-type': 'text/plain',
            'Credentials': 'include'
        },
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(NewPost),
    });
    const answer = await response.json();
    console.log(answer);
    if (response.ok) {
        window.location.href = '/';
        return
    } else {
        const errorMessage = await response.text();
        console.log(errorMessage);
        alert(`Registration failed: ${errorMessage}`);
    }
}

export const Get_Posts = async() => {
    const response = await fetch(`${baseURL}/post`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        const errorMessage = await response.text();
        throw errorMessage
    }
}

export const Get_Post = async(id) => {
    const response = await fetch(`${baseURL}/post/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        const errorMessage = await response.text();
        throw errorMessage
    }
}