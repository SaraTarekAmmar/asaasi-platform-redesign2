import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./locale.css";
import { LocaleProvider } from "./contexts/LocaleContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")!).render(<ThemeProvider><LocaleProvider><AuthProvider><App /></AuthProvider></LocaleProvider></ThemeProvider>);
