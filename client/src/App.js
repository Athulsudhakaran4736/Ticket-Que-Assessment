import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignInPage } from "./Pages/SignInPage/SignInPage";
import { SignUpPage } from "./Pages/SignUpPage/SignUpPage";
import { HomePage } from "./Pages/HomePage/HomePage";
import { AuthProvider } from "./contexts/authContext";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route path="/" element={<SignUpPage />}></Route>
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </AuthProvider>
  );
}
