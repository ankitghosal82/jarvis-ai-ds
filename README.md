# 🤖 JARVIS – AI Voice Assistant (Web Version)

A futuristic, browser-based AI voice assistant that listens, thinks, and speaks. Inspired by Iron Man’s JARVIS, this assistant provides intelligent, natural responses, plays music, reads PDFs aloud, and even chats in multiple languages.

[🔗 Live Demo](https://jarvisaiassistant.vercel.app/)

---

## 🌟 Features

### 🎙️ Voice Activation
- Click the glowing orb to start listening.
- Speak your query naturally, and JARVIS will respond.
- Uses **Web Speech API** for voice recognition and synthesis.

![Voice Activation](https://your-image-link.com/voice.png)

---

### 💬 Gemini-Powered Chat
- Backed by **Google Gemini** API for conversational AI.
- Ask anything—facts, jokes, summaries, or explanations.

![Gemini Chat](https://your-image-link.com/chat.png)

---

### 🌐 Multilingual Support
- Talk to JARVIS in **English**, **Spanish**, **French**, **German**, or **Hindi**.
- Just switch the language from the dropdown menu.

![Language Dropdown](https://your-image-link.com/languages.png)

---

### 📄 PDF Reader
- Upload a `.pdf` file and JARVIS will read it aloud.
- Uses **FileReader API** + browser speech synthesis.

![PDF Reader](https://your-image-link.com/pdf.png)

---

### 📖 Wikipedia Integration
- Ask questions like:
  - “Who is Nikola Tesla?”
  - “What is Quantum Computing?”
- JARVIS will fetch and summarize results from Wikipedia.

---

### 🎶 YouTube Playback
- Say: _"Play Shape of You on YouTube"_
- JARVIS will open YouTube search results in a new tab.

---

### 📝 Personalized Session
- JARVIS remembers your name and tailors interactions accordingly.

---

### 🔊 Text-to-Speech Output
- Every response is read out loud using your browser’s **SpeechSynthesis API**.
- Natural, fluid speech on all devices.

---

### 🖥️ Responsive UI
- Clean, intuitive interface optimized for:
  - Desktop 💻
  - Tablet 📱
  - Mobile 📞

![Responsive](https://your-image-link.com/responsive.png)

---

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| **Frontend** | HTML, CSS, JavaScript          |
| **APIs**     | Google Gemini, Wikipedia API   |
| **Voice**    | Web Speech API (Speech & Listen) |
| **Hosting**  | Vercel                         |

---

## 🚀 How to Use

1. **Go to the live app**:  
   [https://jarvisaiassistant.vercel.app/](https://jarvisaiassistant.vercel.app/)

2. **Start Session**:  
   Enter your name → Click Submit.

3. **Give Commands**:  
   - **Voice**: Click orb and speak.  
   - **Text**: Type in command box and press Enter.

4. **Change Language**:  
   Use dropdown to switch between supported languages.

---

## 🧑‍💻 How to Run Locally

```bash
git clone https://github.com/yourusername/jarvis-voice-assistant.git
cd jarvis-voice-assistant
open index.html in browser
