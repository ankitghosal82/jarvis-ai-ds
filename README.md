# JARVIS AI Assistant

This is a voice-activated AI assistant application, inspired by JARVIS. It allows users to interact with an AI model using voice commands, get information, play YouTube videos, and even process content from uploaded PDF files.

## Features

-   **Voice Interaction**: Speak commands and questions to JARVIS.
-   **AI Responses**: Get answers to general questions, information about people/topics (with Wikipedia links), and code explanations.
-   **YouTube Integration**: Ask JARVIS to play specific songs or videos on YouTube.
-   **Personalized Experience**: JARVIS remembers your name and addresses you by it.
-   **PDF Content Processing**: Upload PDF files and ask JARVIS questions about their content or have it read the content aloud.
-   **Multilingual Support**: Select your preferred language for interaction.
-   **Theme Toggle**: Switch between light and dark modes.
-   **Persistent State**: Your name, language, and conversation history are saved locally.

## Technologies Used

-   **Next.js**: React framework for building the web application.
-   **Tailwind CSS**: For styling and responsive design.
-   **shadcn/ui**: Reusable UI components.
-   **AI SDK**: For integrating with AI models (Cohere).
-   **Web Speech API**: For Speech Recognition and Speech Synthesis.
-   **pdfjs-dist**: For parsing and extracting text from PDF files.

## Setup and Installation

1.  **Clone the repository**:

    \`\`\`bash
    git clone <repository-url>
    cd jarvis-ai-assistant
    \`\`\`

2.  **Install dependencies**:

    \`\`\`bash
    npm install
    # or yarn install
    \`\`\`

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root of your project and add your Cohere API key:

    \`\`\`
    COHERE_API_KEY=your_cohere_api_key_here
    \`\`\`

    You can obtain a Cohere API key from the [Cohere website](https://cohere.com/).

4.  **Run the development server**:

    \`\`\`bash
    npm run dev
    # or yarn dev
    \`\`\`

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1.  **Enter Your Name**: On the first launch, you'll be prompted to enter your name. This helps JARVIS personalize your experience.
2.  **Start Interacting**:
    *   **Voice Commands**: Click the JARVIS orb (the blue circle) to start speaking. Click it again to stop.
    *   **Text Input**: Type your commands or questions into the input field and press Enter or click the send button.
3.  **PDF Interaction**:
    *   Click the upload icon to select a PDF file.
    *   Once uploaded, you can ask JARVIS questions about the PDF content (e.g., "Summarize this document," "What is the main idea of page 5?").
    *   Click the speaker icon to have JARVIS read the PDF content aloud. Click it again to stop.
    *   Click the 'X' icon to clear the loaded PDF content.
4.  **Language Selection**: Use the language dropdown to change JARVIS's response language.
5.  **Theme Toggle**: Use the sun/moon icon to switch between dark and light themes.

## Project Structure

-   `app/api/chat/route.ts`: Next.js API route for interacting with the Cohere AI model.
-   `app/page.tsx`: The main application page, handling UI, state, and client-side logic for voice recognition, synthesis, and PDF processing.
-   `components/`: Contains reusable React components, including:
    -   `jarvis-orb.tsx`: The interactive orb for voice commands.
    -   `language-selector.tsx`: Component for selecting the interaction language.
    -   `pdf-reader.tsx`: Component for uploading, parsing, and reading PDF content.
    -   `theme-provider.tsx`: Context provider for theme management.
    -   `theme-toggle.tsx`: Button to switch themes.
    -   `ui/`: shadcn/ui components.
-   `hooks/`: Custom React hooks.
-   `lib/`: Utility functions.
-   `public/`: Static assets like placeholder images.

## Deployment

This application can be easily deployed to Vercel. Ensure your `COHERE_API_KEY` is set as an environment variable in your Vercel project settings.

## Contributing

Feel free to fork the repository, open issues, or submit pull requests.
