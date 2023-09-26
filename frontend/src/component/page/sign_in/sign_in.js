import { Sign_In_Handler } from "../../../api/Authorization/auth.js";



export default function Sign_In(appDiv) {
    appDiv.innerHTML = ``;
    const divPage = document.createElement("div");
    divPage.innerHTML = `
    <div class="auth-page">
      <form>
        <h1>Sign in</h1>
        <input type="text" name="Username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Log in</button>
      </form>
    </div>
    `;
    const style = document.createElement('style');
    style.textContent = `
    .error {
      color: red;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .auth-page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
    }

    input {
      padding: 10px;
      margin-bottom: 20px;
      width: 300px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 16px;
    }

    button[type="submit"] {
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }

    button[type="submit"]:hover {
      background-color: #45a049;
    }
    `;
    appDiv.appendChild(style)
    appDiv.appendChild(divPage);
    const form = document.querySelector('form');
    form.addEventListener('submit', Sign_In_Handler);
}