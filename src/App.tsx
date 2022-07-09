import { Route, Routes } from "react-router-dom";
import { DeletedIssues } from "./components/DeletedIssues";
import { Home } from "./components/Home";
import { Login } from "./components/LogIn";
import { NotFound } from "./components/NotFound";
import { SignUp } from "./components/SignUp";
import { UserAuthContextProvider, useUserAuth } from "./contexts/userAuthContext";
import ProtectedRoute from './routers/protectedRoute';
import './styles/media.css';

const App = () => {

  return (
    <>
    <UserAuthContextProvider>
      <Routes>
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/deletedissues" element={<DeletedIssues />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserAuthContextProvider>
    </>
  );
}

export default App;
