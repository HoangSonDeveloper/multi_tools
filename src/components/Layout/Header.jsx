import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className="header">
            <Link to="/" className="logo">
                <span className="logo-icon">🛠️</span>
                <span className="logo-text">Amazing Tools</span>
            </Link>
            {!isHome && (
                <Link to="/" className="header-badge">
                    ← Quay lại trang chủ
                </Link>
            )}
            {isHome && (
                <div className="header-badge">100% Miễn phí • Client-Side</div>
            )}
        </header>
    );
};

export default Header;
