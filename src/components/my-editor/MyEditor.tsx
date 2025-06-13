import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@mui/material/styles";

const tinyMCEKey = import.meta.env.VITE_TINYMCE_API_KEY;

interface MyEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const MyEditor = ({ content, setContent }: MyEditorProps) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Editor
      tinymceScriptSrc={`https://cdn.tiny.cloud/1/${tinyMCEKey}/tinymce/6/tinymce.min.js`}
      value={content}
      onEditorChange={(newContent) => setContent(newContent)}
      init={{
        height: 300,
        menubar: false,
        plugins: ["link", "lists", "code", "template"],
        toolbar:
          "undo redo | styleselect | bold italic underline | bullist numlist | link | template | code",
        skin: isDarkMode ? "oxide-dark" : "oxide",
        content_css: isDarkMode ? "dark" : "default",
      }}
    />
  );
};

export default MyEditor;
