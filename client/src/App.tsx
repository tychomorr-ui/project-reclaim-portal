import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Impact from "./pages/Impact";
import Initiative from "./pages/Initiative";
import Legal from "./pages/Legal";
import MetaMata from "./pages/MetaMata";
import Nexus from "./pages/Nexus";
import Opportunities from "./pages/Opportunities";
import Partnerships from "./pages/Partnerships";
import Projects from "./pages/Projects";

function Router() { return <Switch><Route path="/" component={Home} /><Route path="/initiative" component={Initiative} /><Route path="/projects" component={Projects} /><Route path="/partnerships" component={Partnerships} /><Route path="/opportunities" component={Opportunities} /><Route path="/impact" component={Impact} /><Route path="/meta-mata" component={MetaMata} /><Route path="/nexus" component={Nexus} /><Route path="/contact" component={Contact} /><Route path="/privacy" component={Legal} /><Route path="/terms" component={Legal} /><Route path="/admin" component={Admin} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
export default App;
