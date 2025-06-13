# AI-Enhanced Intelligence Dashboard

# Dashboard that allows users to create, edit, and organize reports, with AI-enhanced features like content summarization and draft generation.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Tech Stack

- React + TypeScript
- Context API
- dnd-kit (drag and drop)
- OpenAI API (via serverless function)
- Material UI (MUI)
- Vite
- Vercel

## ⚙️ Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/andreja5/ai-intelligence-dashboard
cd ai-intelligence-dashboard
npm install
```

## Create .env file

```
VITE_OPENAI_API_KEY=your_openai_key_here
VITE_API_URL=http://localhost:3001
```

## Run the development server

```
npm run dev
```

## App will be available at: http://localhost:5173

## User Roles

Admin: Can create, edit, delete reports, and use AI features

Viewer: Can view reports only

Role is stored in localStorage under the key user_role.

Example mock user (stored on first load):

```
{
  id: "1",
  name: "Dev User",
  role: "viewer", // default
}
```

## OpenAI Integration

The API calls to OpenAI are handled in a local Vercel-like serverless function:

```
/api/summarize.ts
```

Make sure to run your dev server using Vercel

```
vercel dev
```

## Project Structure

```
src/
│
├── components/
├── context/
├── hooks/
|-- pages/          # didn't created any page cause it was not required but this would be the structure
├── types/
├── utils/
├── api/            # serverless functions (for OpenAI)
└── App.tsx
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
