const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

// Function to append messages to the chatbox
function appendMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = content;

    messageDiv.appendChild(messageContent);
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to handle sending a message
function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user's message
    appendMessage(message, 'user');
    userInput.value = '';

    // Call backend API
    fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content:message }),
        
    })
    .then(response => response.json())
    .then(data => {
        // Display bot's response
        appendMessage(data.response, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('Something went wrong. Please try again.', 'bot');
    });
}
console.log("body", message)

// Send message on Enter key press
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
