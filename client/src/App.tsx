import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Initiative from "./pages/Initiative";
import Projects from "./pages/Projects";
import Partnerships from "./pages/Partnerships";
import Opportunities from "./pages/Opportunities";
import Impact from "./pages/Impact";
import Nexus from "./pages/Nexus";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Admin from "./pages/Admin";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/initiative"} component={Initiative} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/partnerships"} component={Partnerships} />
      <Route path={"/opportunities"} component={Opportunities} />
      <Route path={"/impact"} component={Impact} />
      <Route path={"/nexus"} component={Nexus} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/privacy"} component={Legal} />
      <Route path={"/terms"} component={Legal} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
