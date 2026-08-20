/** Atlas Field Notes design contract: a map-first shell with a single focused route and warm editorial map tooling. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider><Toaster /><Home /></TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
