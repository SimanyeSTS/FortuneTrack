<template>
  <div>
    <button class="chat-button" @click="toggleChat">
      <span class="icon-container" title="AI Insights">
        <i class="bi bi-lightbulb-fill"></i>
</span>
    </button>

    <div v-if="isChatOpen" class="admin-modal" @click.self="toggleChat">
      <div class="admin-modal-content">
        <h1>Market Analysis & Forecasts</h1>
        <div class="modal-scroll-container">
          <div class="messageBox" :class="{ 'expanded-messagebox': isFullScreen }">
            <button 
              class="full-screen-toggle" 
              @click="toggleFullScreen"
            >
              {{ isFullScreen ? '↙ Collapse' : '↗ Expand' }}
            </button>
            <template v-for="(message, index) in messages" :key="index">
              <div :class="message.from === 'user' ? 'messageFromUser' : 'messageFromAI'">
                <span v-html="formatMessage(message.data)"></span>
              </div>
            </template>
            <div v-if="isTyping" class="messageFromAI typing-indicator">
              <span class="typing-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </span>
            </div>
          </div>
          <input 
            v-if="!isFullScreen"
            v-model="currentMessage" 
            type="text" 
            placeholder="Ask about company performance, forecasts, or market analysis..." 
            @keyup.enter="sendMessage(currentMessage)"
          />
          <div v-if="!isFullScreen" class="button-group">
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
    const isFullScreen = ref(false);

    const predictionData = computed(() => store.getters.singlePrediction);
    const currentUser = computed(() => store.getters.current);

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
          data: `Welcome, ${firstName}! I'm here to help you analyze ${predictionData.value?.Name || 'this company'}'s performance and provide valuable market insights. What information are you interested in?

Please note: On desktop, scroll to the bottom to access the typing field and the Send button.`
        });
      }
    };

    const toggleFullScreen = () => {
      isFullScreen.value = !isFullScreen.value;
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
      isFullScreen,
      toggleChat,
      sendMessage,
      formatMessage,
      toggleFullScreen
    };
  }
};
</script>

<style scoped>
.bi {
  font-size: 30px!important;
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
  animation: fadeIn 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
@keyframes fadeIn {
from {
opacity: 0;
transform: scale(0.95);
}
to {
opacity: 1;
transform: scale(1);
}
}
.close-button {
background: none;
border: none;
color: white;
font-size: 30px;
cursor: pointer;
position: absolute;
top: 10px;
right: 10px;
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
.form-group {
margin-bottom: 15px;
}
button:hover {
background-color: #1249ef !important;
color: black !important;
border: solid black !important;
}
.save-button {
background-color: white !important;
color: #4169E1 !important;
border: 2px solid #002080 !important;
padding: 10px;
border-radius: 4px;
cursor: pointer;
}
.save-button:hover {
background-color: #1249ef !important;
color: black !important;
}
h1 {
font-family: 'Montserrat', sans-serif;
font-weight: 900;
color: white;
font-size: 28px;
text-align: center;
padding: 10px;
}
@media (max-width: 600px) {
.admin-modal-content {
padding: 15px;
width: 95%;
max-width: 90%;
}
.messageBox {
padding: 5px;
}
.save-button {
padding: 8px;
font-size: 16px;
}
.close-button {
top: 5px;
right: 5px;
font-size: 24px;
}
}
@keyframes bounce-animation {
0%, 100% { transform: translateY(0); }
50% { transform: translateY(-10px); }
}
.chat-button {
animation: bounce-animation 2s ease infinite;
animation-delay: 0s;
transition: transform 0.2s ease-in-out;
background-color: #2196F3;
color: white;
border: none;
border-radius: 50%;
width: 80px;
height: 80px;
font-size: 16px;
cursor: pointer;
position: fixed;
bottom: 20px;
right: 20px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
border: solid white;
}
.chat-button:active {
transform: scale(0.95);
box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.chat-button:hover {
animation-play-state: paused;
background-color: #1A73B5 !important;
border: solid black;
}
.chat-button:hover .bi,
.bi:hover {
color: black;
}
.bi {
font-size: 50px;
}
.icon-container {
display: inline-block;
}
h1 {
font-family: 'Montserrat', sans-serif;
font-weight: 900;
color: white;
font-size: 24px;
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
padding: 8px 12px !important;
min-width: 60px;
max-width: fit-content;
}
.typing-dots {
display: flex;
gap: 4px;
align-items: center;
justify-content: center;
}
.dot {
width: 8px;
height: 8px;
background-color: white;
border-radius: 50%;
display: inline-block;
animation: bounce 1.4s infinite ease-in-out;
}
.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce {
0%, 80%, 100% { transform: translateY(0); }
40% { transform: translateY(-8px); }
}
.messageFromUser, .messageFromAI {
margin: 10px;
padding: 12px;
border-radius: 8px;
max-width: 80%;
word-wrap: break-word;
}
.messageFromUser {
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
  color: white;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 1px;
  right: 7px;
}
.close-button:hover {
color: black;
background: #0f3dc6;
border: solid black;
}
.full-screen-toggle {
position: absolute;
bottom: 10px;
right: 10px;
background-color: #2196F3;
color: white;
border: none;
border-radius: 4px;
padding: 5px 10px;
cursor: pointer;
z-index: 10;
font-size: 12px;
}
.full-screen-toggle:hover {
background-color: #1A73B5;
}
.expanded-messagebox {
height: calc(100% - 40px) !important;
max-height: none !important;
overflow-y: auto;
}
.modal-scroll-container .expanded-messagebox {
margin-bottom: 0;
}
@media (max-width: 800px) {
.chat-button {
width: 100px;
height: 100px;
}
.bi {
font-size: 30px;
}
.admin-modal-content {
width: 90vw;
height: auto;
padding: 15px;
max-height: 85vh;
}
h1 {
font-size: 20px;
}
}
@media (max-width: 450px) {
.chat-button {
width: 80px;
height: 80px;
}
.bi {
font-size: 25px;
}
h1 {
font-size: 18px;
}
}
@media (max-width: 300px) {
.chat-button {
width: 60px;
height: 60px;
}
.bi {
font-size: 20px;
}
.admin-modal-content {
padding: 10px;
max-height: 85vh;
}
h1 {
font-size: 16px;
}
.save-button {
padding: 8px 16px;
}
.close-button {
font-size: 20px;
}
}
</style>