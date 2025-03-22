const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Função para adicionar uma mensagem ao chat
function addMessage(message, isUser) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para a última mensagem
}

// Função para enviar a mensagem do usuário e obter a resposta do bot
async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Adiciona a mensagem do usuário ao chat
  addMessage(userMessage, true);
  userInput.value = ''; // Limpa o campo de entrada

  try {
    // Envia a mensagem para a API da OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`, 
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    addMessage(botMessage, false);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    addMessage('Desculpe, ocorreu um erro. Tente novamente.', false);
  }
}

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
