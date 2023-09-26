import { get_categories, Create_Post_Handler } from "../../../api/post/post.js";


export default async function Create_Post(appDiv) {
    let categories;
    try {
        categories = await get_categories();
    } catch (error) {
        console.log(error);
        appDiv.innerHTML = "<h1>Error: " + error.message + "</h1>";
        return
    }


    appDiv.innerHTML = ``;
    const divPage = document.createElement("div");
    divPage.innerHTML = `
    <div class="post-create-page">
      <form>
        <label for="post-title">Title:</label>
        <input type="text" id="post-title" name="post-title" required>
        <br>
        <label for="post-category">Category:</label>
        <select id="post-category" name="post-category" required>
             ` + categories.map((category) => {
        return '<option value="' +
            category.Category + '">' +
            category.Category + '</option>'
    }) + `
        </select>
        <br>
        <label for="post-content">Content:</label>
        <textarea id="post-content" name="post-content" rows="10" cols="50" required></textarea>
        <br>
        <button type="submit">Create</button>
      </form>
    <div>
    `;
    const style = document.createElement('style');
    style.textContent = `
    .post-create-page{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    h1 {
        text-align: center;
        margin-top: 30px;
      }
      form {
        width: 50%;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
      }
      label {
        display: block;
        font-size: 18px;
        margin-bottom: 10px;
      }
      input[type="text"],
      select,
      textarea {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 20px;
      }
      button[type="submit"] {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
      }
      button[type="submit"]:hover {
        background-color: #3e8e41;
      }
  `;

    document.head.appendChild(style);
    appDiv.appendChild(divPage);
    const form = appDiv.querySelector('form');
    form.addEventListener('submit', Create_Post_Handler);
}