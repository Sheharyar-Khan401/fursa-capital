import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Register from "../container/Register";
import { Details } from "../container/Details";
import Header from "../shared/components/Header";
import Login from "../container/Login";
import NavrBar from "../shared/components/Navbar";
import Companies from "../container/Companies/companies";
import Portfolio from "../container/portfolio/index";
import Business from "../container/business/index";
import RaiseFund from "../container/RaiseFund/index";
import DealDetails from "../container/Deal";
import ScrollToTop from "../components/scrollTopTop";
import Suitability from "../container/Suitability";
import Settings from "../container/Settings";
import { auth } from "../firebase";
import { store } from "../redux/store";
import { setToken, setUser } from "../redux/Slice/authSlice";
import { useSelector } from "react-redux";
import CreateInvestment from "../container/Investment";
import Footer from "../shared/components/Footer/footer";
import SubmittedAplications from "../container/Applications";
import CompanyDetail from "../container/Company";
import { globalVariables } from "../helper/globalVariables";
import { getUser } from "../redux/api/auth";
import Footer2 from "../shared/components/Footer/footer2";

const ROLE = { investor: "investor", issuer: "issuer" }

export default function Home() {

  const [currentUser, setCurrentUser] = useState(null);
  console.log("currentUser", currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (globalVariables.adminEmail.includes(user?.email)) {
        user["role"] = "admin"
      }
      await getUser(user.uid,
        (data) => {
          user = data
        },)
      setCurrentUser(user);
      store.dispatch(setUser(user))
    });
    return () => unsubscribe();
  }, []);

  const loggedIn = useSelector((state) => state.register.logedIn)
  const renderProtectedRoute = (element, redirectTo) => {
    return loggedIn ? element : <Navigate to={redirectTo} replace />;
  };

  const adminRoute = (element, redirectTo) => {
    return currentUser?.role === "admin" && element
    // : <Navigate to={redirectTo} replace />;
  }

  return (
    <BrowserRouter>
      {loggedIn ? <NavrBar user={currentUser} /> : <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/register/:role" element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path={`/details`}
          element={renderProtectedRoute(<Details />, `/register/${ROLE.investor}`)}
        />
        <Route
          path={`/settings`}
          element={renderProtectedRoute(<Settings />, `/register/${ROLE.investor}`)}
        />
        <Route
          path="/companies"
          element={renderProtectedRoute(<Companies user={currentUser} />, `/register/${ROLE.investor}`)}
        />
        <Route
          path="/portfolio"
          element={renderProtectedRoute(<Portfolio user={currentUser} />, `/register/${ROLE.investor}`)}
        />
        <Route
          path="/business"
          element={renderProtectedRoute(<Business user={currentUser} />, `/register/${ROLE.investor}`)}
        />
        <Route
          path="/business/edit/:id"
          element={renderProtectedRoute(<CompanyDetail user={currentUser} />, `/register/${ROLE.investor}`)}
        />
        <Route
          path="/raisefund/:id?"
          element={renderProtectedRoute(<RaiseFund user={currentUser} />, `/register/${ROLE.investor}`)}
        />
        <Route path="/deal/:id" element={<DealDetails />} />
        <Route
          path={`/${ROLE.investor}/suitability`}
          element={renderProtectedRoute(<Suitability />, `/register/${ROLE.investor}`)}
        />
        <Route
          path={`/investment/:name`}
          element={renderProtectedRoute(<CreateInvestment user={currentUser} />, `/register/${ROLE.investor}`)}
        />
        <Route
          path={`/applications`}
          element={adminRoute(<SubmittedAplications user={currentUser} />, `/register/${ROLE.investor}`)}
        />
        <Route
          path={`/applications/:id`}
          element={adminRoute(<CompanyDetail user={currentUser} />, `/register/${ROLE.investor}`)}
        />
        <Route path="/" element={<Navigate to="companies" replace />} />
        <Route path="*" element={<Navigate to="/register/investor" replace />} />
      </Routes>
      {loggedIn && <Footer2 />}
    </BrowserRouter>
  );
}
