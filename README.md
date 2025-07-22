# Jarvis AI Assistant

This is a personal AI assistant application, inspired by JARVIS, built with Next.js, React, and the Vercel AI SDK.

## Features

-   **Conversational AI:** Interact with an AI assistant for various queries and commands.
-   **Speech-to-Text:** Use voice commands to interact with the assistant.
-   **Text-to-Speech:** The assistant can speak its responses aloud.
-   **PDF Reading:** Upload PDF files and have the assistant read their content or answer questions about them.
-   **Dynamic YouTube Search:** Ask the assistant to play videos, and it will open YouTube with the relevant search.
-   **Personalized Experience:** Set your name for a more personalized interaction.
-   **Language Selection:** Choose your preferred language for speech recognition and synthesis.
-   **Theme Toggle:** Switch between light and dark modes.
-   **Responsive Design:** Optimized for various screen sizes.

## Getting Started

### Prerequisites

-   Node.js (v18.x or later)
-   npm or Yarn
-   Vercel Account (for deployment)
-   Cohere API Key (for AI model)

### Installation

1.  **Clone the repository:**

    \`\`\`bash
    git clone <repository-url>
    cd jarvis-ai-assistant
    \`\`\`

2.  **Install dependencies:**

    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

3.  **Set up Environment Variables:**

    Create a `.env.local` file in the root of your project and add your Cohere API key:

    \`\`\`
    COHERE_API_KEY=your_cohere_api_key_here
    \`\`\`

    Replace `your_cohere_api_key_here` with your actual Cohere API key.

### Running Locally

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This application is designed to be deployed on Vercel.

1.  **Link your project to Vercel:**

    \`\`\`bash
    vercel link
    \`\`\`

2.  **Set up Environment Variables on Vercel:**

    Go to your Vercel project settings, navigate to "Environment Variables," and add `COHERE_API_KEY` with your Cohere API key.

3.  **Deploy:**

    \`\`\`bash
    vercel deploy
    \`\`\`

    Alternatively, you can deploy directly from your Vercel dashboard by importing your Git repository.

    **Important Vercel Deployment Settings:**

    *   **Install Command:** Leave this field **empty**. Vercel will automatically use `npm install` or `yarn install` based on your `package.json`.
    *   **Build Command:** `next build`
    *   **Output Directory:** `.next`

    After making changes to environment variables or build settings, always trigger a new deployment with **"Clear Cache and Deploy"** to ensure a clean build.

## Project Structure

\`\`\`
.
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts        # API route for AI communication
│   ├── globals.css             # Global CSS styles
│   ├── layout.tsx              # Root layout for the Next.js app
│   └── page.tsx                # Main application page
├── components/
│   ├── jarvis-orb.tsx          # Visual orb component for JARVIS
│   ├── language-selector.tsx   # Component for selecting language
│   ├── pdf-reader.tsx          # Component for uploading and reading PDFs
│   ├── theme-provider.tsx      # Context provider for theme management
│   ├── theme-toggle.tsx        # Button to toggle light/dark theme
│   └── ui/                     # Shadcn/ui components
│       └── ...                 # (e.g., button.tsx, input.tsx, card.tsx, etc.)
├── hooks/
│   ├── use-mobile.tsx          # Hook to detect mobile devices
│   └── use-toast.ts            # Hook for toast notifications
├── lib/
│   └── utils.ts                # Utility functions (e.g., `cn` for Tailwind classes)
├── public/                     # Static assets
│   └── ...                     # (e.g., placeholder images)
├── .gitignore                  # Git ignore file
├── components.json             # Shadcn/ui components configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Project README
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
\`\`\`

## Contributing

Feel free to fork the repository and contribute!
