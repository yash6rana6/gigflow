import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Gigs from "./pages/Gigs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateGig from "./pages/CreateGig";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import GigDetails from "./pages/GigDetails";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "./features/auth/authThunks";
import MyGigs from "./pages/MyGigs";
import MyBids from "./pages/MyBids";
import PublicRoute from "./components/PublicRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
         
          <Route path="/" element={<Gigs />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/gigs/:id" element={<GigDetails />} />


          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-gigs" element={<MyGigs />} />
            <Route path="/my-bids" element={<MyBids />} />
            <Route path="/create" element={<CreateGig />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
