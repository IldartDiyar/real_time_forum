import { baseURL } from "../api.js";

export const Sign_Up_Handler = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const Username = formData.get('Username');
    const age = formData.get('age');
    const gender = formData.get('gender');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const password_prove = formData.get('password_prove');
    if (password_prove !== password || age < 18) {
        const errorMessage = "Invalid input. Please make sure your passwords match and you are at least 18 years old.";
        const errorElement = document.querySelector('.error');
        errorElement.textContent = errorMessage;
        return;
    }
    console.log(typeof age);
    const user = {
        email: email,
        nickname: Username,
        age: +age,
        gender: gender,
        firstname: firstName,
        lastname: lastName,
        password: password,
    };
    const response = await fetch(`${baseURL}/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        console.log(response);
        window.location.href = '/sign_in';
    } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`)
    }
}


export const Sign_In_Handler = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const Username = formData.get('Username');
    const password = formData.get('password');
    const user = {
        username: Username,
        password: password,
    };
    const response = await fetch(`${baseURL}/sign-in`, {
        headers: {
            'Accept': 'text/plain',
            'Content-type': 'text/plain',
            'Credentials': 'include'
        },
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        console.log(response);
        window.location.href = '/';
        return
    } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`)

    }
}

export const Log_out = async() => {
    const response = await fetch(`${baseURL}/log-out`, {
        headers: {
            'Accept': 'text/plain',
            'Content-type': 'text/plain',
            'Credentials': 'include'
        },
        credentials: 'include',
        method: 'POST',
    });

    if (response.ok) {
        console.log(response);
        window.location.href = '/sign_in';
        return
    } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`)

    }
}