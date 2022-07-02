import { Route, Routes } from "react-router";
import Login from "../components/Login";
import { Register } from "../components/Register";

const AuthRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
    </Routes>
  )
}

export default AuthRouter;