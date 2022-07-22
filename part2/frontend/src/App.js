import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/User";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<User />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
