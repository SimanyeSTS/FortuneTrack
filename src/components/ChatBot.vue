<template>
  <div>
    <button class="chat-button" @click="toggleChat">
      Predict with AI
    </button>

    <div v-if="isChatOpen" class="admin-modal">
      <div class="admin-modal-content">
        <h1>Market forecasts with AI!</h1>
        <div class="modal-scroll-container">
          <div class="messageBox">
            <template v-for="(message, index) in messages" :key="index">
              <div :class="message.from === 'user' ? 'messageFromUser ' : 'messageFromAI'">
                <span v-html="message.data"></span>
              </div>
            </template>
          </div>
          <input v-model="currentMessage" type="text" placeholder="Type your message..." @keyup.enter="sendMessage(currentMessage)" />
          <div class="button-group">
            <button @click="sendMessage(currentMessage)" class="save-button">Send</button>
          </div>
        </div>
        <button class="close-button" @click="toggleChat">&times;</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentMessage: '',
      messages: [],
      isChatOpen: false,
      witAiToken: process.env.VUE_APP_WIT_AI_TOKEN,
      witAiAppId: process.env.VUE_APP_WIT_AI_APP_ID,
    };
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
    async sendMessage(message) {
      if (!message) return;
      this.messages.push({ from: 'user', data: message });
      this.currentMessage = '';

      try {
        const response = await axios.get(`https://api.wit.ai/speech?v=${message}`, {
          headers: {
            Authorization: `Bearer ${this.witAiToken}`,
          },
          params: {
            app: this.witAiAppId,
          },
        });

        const witAiResponse = response.data;
        const intent = witAiResponse._text;
        const entities = witAiResponse.entities;

        const aiResponse = `You asked about ${intent}. Here are some insights: ${JSON.stringify(entities)}`;
        this.messages.push({ from: 'AI', data: aiResponse });
      } catch (error) {
        console.error('Error:', error);
        this.messages.push({ from: 'AI', data: 'Sorry, I encountered an error.' });
      }
    },
  },
};
</script>

<style scoped>
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

.messageFromUser {
  text-align: right;
  background-color: #175e7f;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}

.messageFromAI {
  text-align: left;
  background-color: #072c67;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
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