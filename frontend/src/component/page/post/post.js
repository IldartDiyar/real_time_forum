import { Get_Post } from "../../../api/post/post.js"


export default async function Post_page(appDiv) {
    appDiv.innerHTML = ''
    const id = window.location.pathname.substring(6);
    if (isNaN(+id) || !id) {
        appDiv.innerHTML = `<h1>Page not found</h1>`;
        return
    }
    let post;
    try {
        post = await Get_Post(id)
    } catch (error) {
        console.log(error);
        appDiv.innerHTML = "<h1>Error: " + error.message + "</h1>";
        return;
    }
    console.log(post);
    const divPage = document.createElement("div");
    divPage.classList.add("post_page");
    divPage.innerHTML = `<div class="post-details">
    <h1>${post.title}</h1>
    <p><strong>Author:</strong> ${post.author}</p>
    <p><strong>Category:</strong> <span class="category">${post.category}</span></p>
    <p><strong>Creation Date:</strong> <span class="creation-date">${post.CreateAt}</span></p>
    <p><strong>Description:</strong> ${post.description}</p>
    </div>`;

    const style = document.createElement("style")
    style.textContent = `
      .post_page{
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        padding: 20px;
      }
      
      h1 {
        color: #333333;
      }
      
      .post-details {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .post-details p {
        margin: 10px 0;
      }
      
      .post-details .category {
        font-weight: bold;
        color: #0066cc;
      }
      
      .post-details .creation-date {
        color: #999999;
      }
    `
    appDiv.appendChild(style);
    appDiv.appendChild(divPage);

}