import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { FileProvider } from "./contexts/FileContext";
import { ChartSchemasProvider } from "./contexts/ChartContext";
import { NavBar } from "./components/navbar";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import { Toaster } from "sonner";

function AppContent() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      <NavBar isLanding={location.pathname === '/'} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/analyze' element={<Analyze />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <>
      <FileProvider>
        <ChartSchemasProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ChartSchemasProvider>
      </FileProvider>
      <Toaster />
    </>
  )
}

export default App
