import React, { useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import Link from 'next/link';
import UserMenu from "./UserMenu";

const Navbar = () => {
    const [show, setShow] = React.useState(false);
    const [user, setUser] = React.useState(
    );

    useEffect(() => {
        window.addEventListener("scroll", fixedNavbar);
        setUser(JSON.parse(localStorage?.getItem("user")))
    }, []);

    // to fix the navbar when scrolling down
    const fixedNavbar = () => {
        if (window.scrollY >= 60) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    return (
        <section className="myNavBar" style={{ marginBottom: 90 }}>
            <nav
                className="navbar navbar-expand-lg navbar-light fixed-top px-5 "
                style={{
                    height: '60px',
                    background: show ? '#f8f8f8' : 'white'
                }}
            >
                <div className="container-fluid">
                    <Link href="/">
                        <span className="navbar-brand" style={{ cursor: 'pointer' }}>
                            TrustiCar
                        </span>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll"
                        aria-controls="navbarScroll"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item">
                                <Link href="/about" >
                                    <span className="nav-link">
                                        About Us
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/contact" className="nav-link">
                                    <span className="nav-link">
                                        Contact Us
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/search">
                                    <span className="nav-link">
                                        Search
                                    </span>
                                </Link>
                            </li>
                        </ul>

                        {!user ? (
                            <div className="navbarButtons d-flex flex-wrap">
                                <Link href="/auth/login">
                                    <button
                                        className="btn btn-outline-success login me-2"
                                        type="submit"
                                    >
                                        <FaUserAlt className="user" />
                                        Login
                                    </button>
                                </Link>
                                <Link href="/auth/register">
                                    <button
                                        className="btn btn-outline-success register"
                                        type="submit"
                                    >
                                        Register
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="btn-group navbarButtons me-2">
                                <UserMenu user={user} />
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
