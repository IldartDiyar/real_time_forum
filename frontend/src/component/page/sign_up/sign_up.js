import { Sign_Up_Handler } from "../../../api/Authorization/auth.js";

export default function Sign_Up(appDiv) {
    appDiv.innerHTML = ``;
    const divPage = document.createElement("div");
    divPage.innerHTML = `
    <div class="registration-page">
      <form>
        <h1>Sign up</h1>
        <input type="text" name="Username" placeholder="Username" required>
        <input type="number" name="age" placeholder="Age" min="18" max="120" required>
        <select name="gender" required>
          <option value="" disabled selected hidden>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="text" name="firstName" placeholder="First Name" required>
        <input type="text" name="lastName" placeholder="Last Name" required>
        <input type="email" name="email" placeholder="E-mail" required>
        <input type="password" name="password" placeholder="Password" required>
        <input type="password" name="password_prove" placeholder="Prove password" required>
        <button type="submit">Sign up</button>
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
    .registration-page {
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
    form.addEventListener('submit', Sign_Up_Handler);
}