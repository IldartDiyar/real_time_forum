export function render(appDiv, users, InChat) {
    appDiv.innerHTML = ``;
    const divPage = document.createElement("div");
    divPage.classList.add("chat_page");
    divPage.innerHTML = `
    <div class="container">
        <div class="user-list">
            <ul>
                ${users.map(user => {
                    if (user === InChat) {
                        return '<li class="active-user">' + user.nickname + '</li>';
                    }
                    return '<li>' + user.nickname + '</li>';
                }).join('')}
            </ul>
        </div>
       
            <div class="chat-window">
                <div class="messages">
                    <div class="message">
                        <div class="message-header">
                            <span class="message-sender">User 1:</span>
                            <span class="message-timestamp">10:00 AM</span>
                        </div>
                    <div class="message-content">
                        Hello!
                    </div>
                </div>
                <div class="message">
                    <div class="message-header">
                        <span class="message-sender">User 2:</span>
                        <span class="message-timestamp">10:05 AM</span>
                    </div>
                    <div class="message-content">
                        Hi there!
                    </div>
                </div>
            </div>
            <div class="input-container">
                <input type="text" id="message-input" placeholder="Type your message..." />
                <button id="send-button">Send</button>
            </div>
        </div>
    </div>
    `;
    return divPage;
}

export function getStyle() {
    return `
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 800px;
        /* Adjust the desired width */
        margin: 0 auto;
        /* Center the container horizontally */
    }
    
    .user-list {
        width: 200px;
        padding: 10px;
        background-color: #f1f1f1;
        border-radius: 5px;
        margin-right: 10px;
    }
    
    .user-list ul {
        list-style-type: none;
        padding: 0;
    }
    
    .user-list li {
        margin-bottom: 5px;
        padding: 5px;
        cursor: pointer;
    }
    
    .user-list li.active-user {
        background-color: #ddd;
    }
    
    .chat-window {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .messages {
        width: 600px;
        /* Adjust the desired width */
        padding: 10px;
        background-color: #f1f1f1;
        border-radius: 5px;
        margin-bottom: 10px;
        overflow-y: scroll;
        height: 80vh;
        display: flex;
        flex-direction: column-reverse;
    }
    
    .message {
        margin-bottom: 10px;
        padding: 5px;
        background-color: #fff;
        border-radius: 5px;
    }
    
    .message-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }
    
    .message-sender {
        font-weight: bold;
    }
    
    .message-timestamp {
        color: #888;
    }
    
    .message-content {
        word-wrap: break-word;
    }
    
    .input-container {
        display: flex;
        align-items: center;
    }
    
    #message-input {
        flex: 1;
        padding: 5px;
        margin-right: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    
    #send-button {
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        cursor: pointer;
    }
    `
}
export function handle_User(divPage, InChat, users) {
    const userItems = divPage.querySelectorAll('.user-list li');
    userItems.forEach((userItem) => {
        userItem.addEventListener('click', () => {
            userItems.forEach((item) => item.classList.remove('active-user'));

            userItem.classList.add('active-user');

            InChat = users.find((user) => user.nickname === userItem.textContent);
            console.log(InChat);
        });
    });
}