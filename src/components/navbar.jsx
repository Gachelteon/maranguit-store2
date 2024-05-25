import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShoppingCart } from "phosphor-react";

function Navbar({ activeSection, setActiveSection }) {
    const handleSectionClick = (section) => {
        setActiveSection(section);
    };

    return (
        <header className="navbar">
            <nav className="navbar-container">
                <div className="navbar-logo">
                    <h1 className="header-title">DEMON SLAYER</h1>
                </div>
                <ul className="navbar-menu">
                    <li>
                        <a href="#" className={activeSection === 'Home' ? 'active-section' : ''} onClick={() => handleSectionClick('Home')}>Home</a>
                    </li>
                    <li>
                        <a href="#" className={activeSection === 'Products' ? 'active-section' : ''} onClick={() => handleSectionClick('Products')}>Products</a>
                    </li>
                </ul>
                <div className="navbar-actions">
                    <a href="#" className={`navcart-icon ${activeSection === 'Orders' ? 'active-section' : ''}`} onClick={() => handleSectionClick('Orders')}>
                        <ShoppingCart size={24} />
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
