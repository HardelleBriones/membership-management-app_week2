import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddMember from "./components/AddMember";
import DisplayMembers from "./components/DisplayMembers";
import MemberProfile from "./components/MemberProfile";
import NotFoundPage from "./Pages/NotFoundPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AdminProfile from "./components/AdminProfile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<DisplayMembers />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/members/:id" element={<MemberProfile />} />
          <Route path="/admin" element={<AdminProfile />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
