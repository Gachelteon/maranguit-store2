import "./App.css";
import React, { useState } from 'react';
import  Navbar  from "./components/navbar";
import Home from "./components/home";
import Products from "./components/products";
import Orders from "./components/orders";




function App() {
  const [activeSection, setActiveSection] = useState('Home');


  return (
      <div>
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

          {activeSection === 'Home' && <Home />}
          {activeSection === 'Products' && <Products />}
          {activeSection === 'Orders' && <Orders />}
      </div>
  );
}

export default App;
