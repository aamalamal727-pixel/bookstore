import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./user/pages/Home";
import Allbook from "./user/pages/Allbook";
import Contact from "./user/pages/Contact";
import Auth from "./pages/Auth";
import Profile from "./user/pages/Profile";
import Viewbook from "./user/pages/Viewbook";
import Adminhome from "./admin/pages/Adminhome";
import Admincollection from "./admin/pages/Admincollection";
import Adminprofile from "./admin/pages/Adminprofile";
import Preloader from "./components/Preloader";
import { useContext, useState } from "react";
import Paymentsuccess from "./user/pages/Paymentsuccess";
import Paymenterr from "./user/pages/Paymenterr";
import { routeGuardContext } from "./ContextAPI/AuthContext";
import Pnf from "./pages/Pnf";

function App() {
  const [loader, setLoader] = useState(true);
  const { role, authorized, setAuthorized }=useContext(routeGuardContext)
  setTimeout(() => {
    setLoader(false);
  }, 5000);

  return (
    <>
      <Routes>
        <Route path="/" element={loader ? <Preloader /> : <Home />} />
        <Route path="/all-books" element={<Allbook />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth register />} />

        {/* user */}
        {
        role=="user"&&
        <>
        <Route path="/profile" element={<Profile />} />
        <Route path="/view/:id" element={<Viewbook />} />
        <Route path="/payment-success" element={<Paymentsuccess />} />
        <Route path="/payment-failed" element={<Paymenterr />} />
        </>
        }

        {/* admin */}
       {
       role=="admin"&&
       <>
        <Route path="/admin/home" element={<Adminhome />} />
        <Route path="/admin/collection" element={<Admincollection />} />
        <Route path="/admin/profile" element={<Adminprofile />} />
       </>
       }
       <Route path="/*" element={<Pnf/>}/>
      </Routes>
    </>
  );
}

export default App;
