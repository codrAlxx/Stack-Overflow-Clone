import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./Routes.jsx";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { SidebarProvider } from "./components/LeftSidebar/LeftSidebarContext";
import { fetchChat } from "./actions/chat";
import { setCurrentUser } from "./actions/currentUser";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());

    const user = JSON.parse(localStorage.getItem("Profile"));
    if (user) dispatch(setCurrentUser(user));
    dispatch(fetchChat());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <SidebarProvider>
          <Navbar />
          <AllRoutes />
        </SidebarProvider>
      </Router>
    </div>
  );
}

export default App;
