import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from '../../../components/adminLayout';
import API from '../../../api';
import CustomLoader from '../../../components/CustomeLoader';

const AdminProfile = () => {
    const [user, setUser] = useState({
        id: "",
        fullName: "",
        userName: "",
        email: "",
        password: "",
        userType: "admin"
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const LoginUser = JSON.parse(localStorage.getItem("user"));
        setUser({
            id: LoginUser._id,
            fullName: LoginUser.fullName,
            userName: LoginUser.userName,
            email: LoginUser.email,
            password: LoginUser.password,
            userType: LoginUser.userType,
        });
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await API.patch(
                `/user/${user?.id}`,
                user
            );
            if (data) {
                toast(data);
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };
    return (
        <>
            {loading && (
                <CustomLoader />
            )}
            <AdminLayout>
                <div className="userProfile-main">
                    <div className="container">
                        <h2>Profile</h2>
                        <form className="user-Details" onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                    value={user.fullName}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">User Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => setUser({ ...user, userName: e.target.value })}
                                    value={user.userName}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    value={user.email}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    disabled
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    value={user.password}
                                />
                            </div>
                            <button
                                className="btn btn-primary"                            >
                                Update Changes
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default AdminProfile;
