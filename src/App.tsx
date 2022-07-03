import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/LogIn";
import { NotFound } from "./components/NotFound";
import { SignUp } from "./components/SignUp";
import { UserAuthContextProvider } from "./contexts/userAuthContext";

const App = () => {
  return (
    <>
    <UserAuthContextProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserAuthContextProvider>
    </>
  );
}

export default App;
