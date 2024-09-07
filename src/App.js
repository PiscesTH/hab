import "./App.css";
import { Route, Routes,} from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import LoginPage from "./LoginPage.js";
import SignupPage from "./SignupPage.js";
import Header from "./Header.js";
import { AuthProvider } from "./AuthContext.js";
import MainPage from "./MainPage.js";
import SecondPage from "./SecondPage.js";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div className="body">
          <div className="container">
            <header>
              <Header />
            </header>
            <main>
              <Routes>
                <Route exact="true" path="/" element={<MainPage />}></Route>
                <Route path="/list" element={<SecondPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<SignupPage />}></Route>
              </Routes>
            </main>
            <footer>Copyright 2024. TH All rights reserved.</footer>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
