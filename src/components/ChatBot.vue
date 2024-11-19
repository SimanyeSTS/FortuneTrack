<template>
  <div>
    <button class="chat-button" @click="toggleChat">
      <span>AI Insights</span>
    </button>

    <div v-if="isChatOpen" class="admin-modal">
      <div class="admin-modal-content">
        <h1>Market Analysis & Forecasts</h1>
        <div class="modal-scroll-container">
          <div class="messageBox">
            <template v-for="(message, index) in messages" :key="index">
              <div :class="message.from === 'user' ? 'messageFromUser ' : 'messageFromAI'">
                <span v-html="formatMessage(message.data)"></span>
              </div>
            </template>
          </div>
          <div v-if="isTyping" class="typing-indicator">AI is analyzing...</div>
          <input 
            v-model="currentMessage" 
            type="text" 
            placeholder="Ask about company performance, forecasts, or market analysis..." 
            @keyup.enter="sendMessage(currentMessage)"
          />
          <div class="button-group">
            <button @click="sendMessage(currentMessage)" class="save-button" :disabled="isTyping">
              Send
            </button>
          </div>
        </div>
        <button class="close-button" @click="toggleChat">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const currentMessage = ref('');
    const messages = ref([]);
    const isChatOpen = ref(false);
    const isTyping = ref(false);

    const predictionData = computed(() => store.getters.singlePrediction);
    const currentUser  = computed(() => store.getters.current); // Get the current user

    const formatMessage = (text) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
    };

    const toggleChat = () => {
      isChatOpen.value = !isChatOpen.value;
      if (isChatOpen.value && messages.value.length === 0) {
        const firstName = currentUser.value?.firstName || 'there';
        messages.value.push({
          from: 'AI',
          data: `Welcome ${firstName}! I can help you analyze ${predictionData.value?.Name || 'this company'}'s performance and provide market insights. What would you like to know?`
        });
      }
    };

    const sendMessage = async (message) => {
  if (!message.trim()) return;

  messages.value.push({ from: 'user', data: message });
  currentMessage.value = '';
  isTyping.value = true;

  try {
    const response = await store.dispatch('generatePrediction', {
      message,
      companyData: predictionData.value
    });

    messages.value.push({
      from: 'AI',
      data: response
    });
  } catch (error) {
    // Handle error as an AI message
    let errorMessage = 'I apologize, but I encountered an error processing your request.';
    if (error.response?.data?.message) {
      errorMessage += ` Details: ${error.response.data.message}`;
    }
    
    messages.value.push({
      from: 'AI',
      data: errorMessage
    });
  } finally {
    isTyping.value = false;
  }
};

    return {
      currentMessage,
      messages,
      isChatOpen,
      isTyping,
      toggleChat,
      sendMessage,
      formatMessage
    };
  }
};
</script>

<style scoped>
@keyframes bounce-animation {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.chat-button {
  animation: bounce-animation 2s ease infinite;
  animation-delay: 0s;
}

.chat-button:hover {
  animation-play-state: paused;
}

.chat-button {
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  font-size: 16px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.chat-button:hover {
  background-color: #1A73B5!important;
}

.admin-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.admin-modal-content {
  background: #4169E1;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  height: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  max-height: 600px;
  min-height: 400px;
}

.modal-scroll-container {
  overflow-y: auto;
  margin-right: -10px;
  padding-right: 10px;
  flex-grow: 1;
}

.modal-scroll-container::-webkit-scrollbar {
  width: 8px;
}

.modal-scroll-container::-webkit-scrollbar-track {
  background: #2d5bd7;
  border-radius: 4px;
}

.modal-scroll-container::-webkit-scrollbar-thumb {
  background: #1a3c9e;
  border-radius: 4px;
}

.messageBox {
  height: 300px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.typing-indicator {
  padding: 10px;
  color: #ffffff;
  font-style: italic;
  text-align: center;
}

.messageFromUser , .messageFromAI {
  margin: 10px;
  padding: 12px;
  border-radius: 8px;
  max-width: 80%;
  word-wrap: break-word;
}

.messageFromUser  {
  background-color: #2196F3;
  color: white;
  margin-left: auto;
}

.messageFromAI {
  background-color: #333;
  color: white;
  margin-right: auto;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

h1 {
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
}

.save-button {
  background-color: white;
  color: #4169E1;
  border: 2px solid #002080;
  padding: 10px 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #1249ef;
  color: black;
  border: solid black;
}

.close-button {
  background: none;
  border: none;
  color: #000;
  font-size: 24px;
  cursor: pointer;
  margin-top: 10px;
  transition: color 0.3s;
}

.close-button:hover {
  color: black;
  background: #0f3dc6;
  border: solid black;
}

h1 {
  margin: 0 0 20px 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 24px;
}

/* Media Queries */
@media (max-width: 800px) {
  .admin-modal-content {
    width: 90vw;
    height: auto;
    padding: 15px;
    max-height: 85vh;
  }

  .form-group input,
  .form-group select {
    padding: 8px;
  }

  h1 {
    font-size: 20px;
  }
}

@media (max-width: 450px) {
  .form-group input,
  .form-group select {
    padding: 8px;
  }

  h1 {
    font-size: 20px }
}

@media (max-width: 300px) {
  .admin-modal-content {
    width: 90vw;
    height: auto;
    padding: 10px;
    max-height: 85vh;
  }

  .form-group {
    margin-bottom: 10px;
  }

  .save-button {
    padding: 8px 16px;
  }

  .close-button {
    font-size: 20px;
  }
}
</style>