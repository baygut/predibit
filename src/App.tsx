import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Home, PredictionMarket, Wagmi } from "@/pages";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
    useEffect(() => {
        console.log("App mounted");
        // Log environment variables (excluding sensitive data)
        console.log("Environment:", {
            NODE_ENV: process.env.NODE_ENV,
            BASE_URL: process.env.BASE_URL,
        });
    }, []);

    return (
        <ErrorBoundary>
            <Router>
                <main className="min-h-screen flex flex-col justify-between">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/wagmi" element={<Wagmi />} />
                        <Route
                            path="/prediction"
                            element={<PredictionMarket />}
                        />
                    </Routes>
                    <Footer />
                    <Toaster />
                </main>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
