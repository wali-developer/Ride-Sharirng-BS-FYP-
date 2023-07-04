import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Button } from "react-bootstrap";

const Header = ({ toggle, setToggle }) => {
    const [show, setShow] = useState(false);
    const [loginUser, setLoginUser] = useState([]);

    useEffect(() => {
        setLoginUser(JSON.parse(localStorage.getItem('user')));
    }, [])

    return (
        <header className="userHeader" >
            <div className="d-flex flex-row flex-wrap justify-content-between align-items-center header-flex">
                <button
                    // onClick={() => setToggle(!toggle)}
                    className="toggler-btn"
                >
                    <span className="line1"></span>
                    <span className="line2"></span>
                    <span className="line3"></span>
                </button>
                <div className="logoContainer d-flex justify-content-center align-items-center mt-1">
                    {/* <img src="images/logo.svg" alt="Logo" className="me-2" /> */}
                    <Link href={"/"}>
                        <span className="user_layout_logo">TrustiCar</span>
                    </Link>
                </div>
                <div className="header-right-content d-flex flex-row align-items-center">
                    <div className="notification-cont ms-4">
                        <img src="/images/ic_Notification.svg" alt="Notification" />
                    </div>
                    <div className="d-flex flex-row align-content-center">
                        <div className="header-circle ms-4"></div>
                        <span className="user_name">{loginUser?.fullName}</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
