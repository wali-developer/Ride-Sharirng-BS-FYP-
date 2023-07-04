import React, { useState } from "react";
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import Link from 'next/link';
import API from "../../../api";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        email: "",
        password: "",
        userType: "",
    });

    // handle user registration
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await API.post('/user/register', formData);
            // if (data === "User has already Register...") {
            //     alert(data, { position: "top-center" });
            // } else {
            //     router.push('/auth/login')
            // }
            if (res?.status !== 201) {
                toast.error(res?.data, { position: 'top-center' })
            } else {
                toast(res?.data, { position: 'top-center' })
                setTimeout(() => {
                    router.push('/auth/login')
                }, 1500)
            }
            console.log(res?.data);
        } catch (err) {
            console.log(err);
            setFormData({
                fullName: "",
                userName: "",
                email: "",
                password: "",
                userType: "",
            });
        }
        // router.push("/auth/login");
    };
    return (
        <Layout>
            <section className="formContainer">
                <div className="container">
                    <div className="Register" data-aos="zoom-in" data-aos-duration="1200">
                        <h2 className="text-center my-5">Register yourself on TrustiCar</h2>
                        <form
                            onSubmit={(e) => handleRegister(e)}
                        >
                            <div className="mb-4 input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Full Name..."
                                    name="fullName"
                                    onChange={(event) => {
                                        setFormData({ ...formData, fullName: event.target.value });
                                    }}
                                />
                            </div>
                            <div className="mb-4 input-group">
                                <input
                                    type="username"
                                    className="form-control"
                                    placeholder="Username..."
                                    name="username"
                                    onChange={(event) => {
                                        setFormData({ ...formData, userName: event.target.value });
                                    }}
                                />
                            </div>
                            <div className="mb-4 input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email..."
                                    name="email"
                                    onChange={(event) => {
                                        setFormData({ ...formData, email: event.target.value });
                                    }}
                                />
                            </div>
                            <div className="mb-4 input-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password..."
                                    name="password"
                                    onChange={(event) => {
                                        setFormData({ ...formData, password: event.target.value });
                                    }}
                                />
                            </div>
                            <label>Select user type</label>
                            <select
                                className="mb-4 form-select"
                                aria-label="Default select example"
                                placeholder="User type"
                                name="usertype"
                                onChange={(event) => {
                                    setFormData({ ...formData, userType: event.target.value });
                                }}
                            >
                                <option value="Passenger">Passenger</option>
                                <option value="Driver">Driver</option>
                            </select>

                            <Link href="/auth/login">
                                <p className="alreadyAccount">Already have Account ?</p>
                            </Link>
                            <button type="submit" className="btn btn-primary primaryBtn">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Register;
