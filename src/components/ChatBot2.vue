<template>
    <div>
      <button class="chat-button" @click="toggleChat">
        <span>Market Guide</span>
      </button>
  
      <div v-if="isChatOpen" class="chat-modal">
        <div class="chat-modal-content">
          <h1>Market Sector Guide</h1>
          <div class="modal-scroll-container">
            <div class="messageBox" :class="{ 'expanded-messagebox': isFullScreen }">
              <button class="full-screen-toggle" @click="toggleFullScreen">
                {{ isFullScreen ? '↙ Collapse' : '↗ Expand' }}
              </button>
              <template v-for="(message, index) in messages" :key="index">
                <div :class="message.from === 'user' ? 'messageFromUser' : 'messageFromGuide'">
                  <span v-html="formatMessage(message.content)"></span>
                </div>
              </template>
              <div v-if="isTyping" class="messageFromGuide typing-indicator">
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
              placeholder="Ask about sectors, trends, or click Predict for detailed analysis..." 
              @keyup.enter="sendMessage"
            />
            <div v-if="!isFullScreen" class="button-container">
              <button @click="sendMessage" class="send-button" :disabled="isTyping || !currentMessage.trim()">
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
    name: 'ChatBot2',
    setup() {
      const store = useStore();
      const currentMessage = ref('');
      const messages = ref([]);
      const isChatOpen = ref(false);
      const isTyping = ref(false);
      const isFullScreen = ref(false);
  
      // Get sector data from store
      const sectors = computed(() => ({
        retail: store.state.retail,
        technology: store.state.technology,
        foodAndBeverages: store.state.foodAndBeverages,
        healthcare: store.state.healthcare
      }));
  
      const welcomeMessages = [
        "Hi there! Want to explore market sectors? I can help you understand what's happening!",
        "Looking for sector insights? I'm your friendly guide! What would you like to know?",
        "Need help understanding market sectors? Let's explore together!"
      ];
  
      const formatMessage = (text) => {
        return text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\n/g, '<br>');
      };
  
      const toggleChat = () => {
        isChatOpen.value = !isChatOpen.value;
        if (isChatOpen.value && messages.value.length === 0) {
          const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
          messages.value.push({
            from: 'guide',
            content: randomWelcome
          });
        }
      };
  
      const toggleFullScreen = () => {
        isFullScreen.value = !isFullScreen.value;
      };
  
      const sendMessage = async () => {
        if (!currentMessage.value.trim()) return;
  
        const message = currentMessage.value;
        messages.value.push({ 
          from: 'user', 
          content: message 
        });
        
        currentMessage.value = '';
        isTyping.value = true;
  
        try {
          const response = await store.dispatch('getSectorInsights', {
            message,
            sectors: sectors.value
          });
  
          messages.value.push({
            from: 'guide',
            content: response
          });
        } catch (error) {
          messages.value.push({
            from: 'guide',
            content: "Oops! I had trouble processing that. Let's try again!"
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

  .chat-modal {
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

  .chat-modal-content {
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

  .messageFromUser , .messageFromGuide {
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

  .messageFromGuide {
    background-color: #333;
    color: white;
    margin-right: auto;
  }

  .messageFromGuide {
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

  .button-container  {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .send-button {
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

  .send-button:hover {
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
    .chat-modal-content {
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
    .chat-modal-content {
      width: 90vw;
      height: auto;
      padding: 10px;
      max-height: 85vh;
    }

    .form-group {
      margin-bottom: 10px;
    }

    .send-button {
      padding: 8px 16px;
    }

    .close-button {
      font-size: 20px;
    }
  }
</style>