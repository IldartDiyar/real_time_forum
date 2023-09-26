import { Get_Posts } from "../../../api/post/post.js";

export default async function Home(appDiv) {
    appDiv.innerHTML = '';
    const divPage = document.createElement("div");
    divPage.classList.add("posts_page");

    let posts;

    try {
        posts = await Get_Posts();
    } catch (error) {
        console.log(error);
        appDiv.innerHTML = "<h1>Error: " + error.message + "</h1>";
        return;
    }

    posts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("post-card");
        postCard.innerHTML = `
      <a class="post-title" href="/post/${post.ID}">
        <h2 class="title">${post.title}</h2>
      </a>
      <div class="post-details">
        <p class="author">Author: ${post.author}</p>
        <p class="time">Time: ${post.CreateAt}</p>
        <p class="categories">Categories: ${post.category}</p>
      </div>`;
        divPage.appendChild(postCard);
    });

    const style = document.createElement("style");
    style.textContent = `
    .posts_page {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .post-card {
      margin-bottom: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      text-decoration: none;
      color: inherit;
      box-sizing: border-box;
    }

    .post-title {
      text-decoration: none;
      font-size: 18px;
      font-weight: bold;
      color: inherit;
      cursor: pointer;
    }

    .post-details {
      font-size: 14px;
      color: #666;
      margin-top: 10px;
    }

    .author,
    .time,
    .categories {
      margin-bottom: 5px;
    }
  `;
    appDiv.appendChild(style);
    appDiv.appendChild(divPage);
}