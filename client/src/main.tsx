import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./locale.css";
import { LocaleProvider } from "./contexts/LocaleContext";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(<LocaleProvider><AuthProvider><App /></AuthProvider></LocaleProvider>);
