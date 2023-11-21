import React from 'react';
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import Home from "./components/Home/Home";
import ListUsers from "./components/Users/ListUsers";
import Footer from "./components/Footer/Footer";
import AddJewelry from "./components/AddJewelry/AddJewelry";
import EditJewelry from "./components/EditJewelry/EditJewelry";
import SearchFilter from "./components/SearchFilter/SearchFilter";
//import ErrorBoundry from "./components/ErrorHandling/ErrorBoundry";
import ListJewelries from "./components/ListAnimals/ListJewelries";
import AboutUs from "./components/AboutUs/AboutUs"
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { AuthProvider } from './components/AuthContext/AuthContext';
const App = (props) => {
    // <ErrorBoundry>
  return (
      <AuthProvider>
      <div className="div-body">
          <Router>
          <Navbar />
          <main>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/registration" element={<Register />} />
                  <Route path="/aboutUs" element={<AboutUs />} />
                  <Route path="/users" element={<ListUsers />} />
                  <Route path="/jewelries" element={<ListJewelries />} />
                  <Route path="/add/jewelry" element={<AddJewelry />} />
                  <Route path="/search" element={<SearchFilter />} />
                  <Route path="/edit/jewelry/:id" element={<EditJewelry />}/>
              </Routes>
          </main>
          <Footer/>
      </Router>
      </div>
      </AuthProvider>
  );
}

export default App;
