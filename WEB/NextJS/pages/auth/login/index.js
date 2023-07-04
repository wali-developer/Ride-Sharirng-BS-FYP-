import React, { useState, useEffect } from "react";
import { FaUserAlt, FaEye } from "react-icons/fa";
import Layout from '../../../components/layout';
import Link from 'next/link';
import API from "../../../api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Loader from '../../../components/CustomeLoader';

const Index = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // handle user login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await API.post("/user/login", formData);
            if (!data.token && !data.user) {
                toast.error(data, { position: "top-center" });
            } else {
                toast.success('Login Successfull !!!', { position: 'top-right' })
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                if (data.user.email === "waliullah@trusticar.com") {
                    router.push("/admin/dashboard");
                } else {
                    router.push("/user/dashboard");
                }
            }
            console.log(data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err);
        }
    };
    return (
        <>
            {loading && <Loader />}
            <Layout>
                <section className="formContainer">
                    <div className="container">
                        <div className="Login">
                            <h1>Welcome Back !</h1>
                            <h4 className="text-start my-4">Login to your Account</h4>
                            <form
                                onSubmit={(e) => handleLogin(e)}
                            >
                                <div className="mb-4 input-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your Email..."
                                        name="email"
                                        onChange={(event) => {
                                            setFormData({ ...formData, email: event.target.value });
                                        }}
                                    />
                                    <FaUserAlt className="loginIon" />
                                </div>
                                <div className="mb-4 input-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password..."
                                        autoComplete="off"
                                        name="password"
                                        onChange={(event) => {
                                            setFormData({ ...formData, password: event.target.value });
                                        }}
                                    />
                                    <FaEye className="loginIon" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" />
                                    <label className="form-check-label">Remember me</label>
                                </div>
                                <Link href="#">
                                    <p className="forgot" style={{ cursor: "pointer" }}>Forgot Password</p>
                                </Link>

                                <button type="submit" className="btn btn-primary primaryBtn">
                                    Login
                                </button>
                                <Link href="/auth/register">
                                    <p className="alreadyAccount">Not have Account yet ?</p>
                                </Link>
                            </form>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Index;
