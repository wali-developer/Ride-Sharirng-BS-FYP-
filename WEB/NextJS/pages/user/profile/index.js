import axios from "axios";
import React, { useEffect, useState } from "react";
import UserLayout from '../../../components/userLayout';
import { toast } from "react-toastify";
import API from '../../../api';
import CustomeLoader from "../../../components/CustomeLoader";

const UserProfileEdit = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        id: "",
        fullName: "",
        userName: "",
        email: "",
        userType: "",
    });
    const [file, setFile] = useState();

    // update profile Handler
    const handleUpdate = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const { data } = await API.patch(`/user/${user.id}`, user);
            toast.success(data);
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err);
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(
            {
                ...user,
                id: user?._id,
                fullName: user?.fullName,
                userName: user?.userName,
                email: user?.email,
                userType: user?.userType
            }
        )
    }, [])
    return (
        <>
            <UserLayout>
                <div className="col-md-9 userProfile-main py-5">
                    <div className="container">
                        <h2>Profile</h2>
                        <form
                            className="user-Details"
                            onSubmit={(e) => handleUpdate(e)}
                        >
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                    value={user.fullName}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">User Name</label>
                                <input
                                    type="text"
                                    name="userName"
                                    className="form-control"
                                    onChange={(e) => setUser({ ...user, userName: e.target.value })}
                                    value={user.userName}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    value={user.email}
                                />
                            </div>
                            <div className="mb-3 mt-4">
                                <label>User type</label>
                                <select
                                    className="mb-4 form-select"
                                    aria-label="Default select example"
                                    placeholder="User type"
                                    name="userType"
                                    onChange={(e) => setUser({ ...user, userType: e.target.value })}
                                    value={user.userType}
                                >
                                    <option value="Passenger">Passenger</option>
                                    <option value="Driver">Driver</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="file">
                                    Select Your Image
                                </label>
                                <input
                                    type="file"
                                    // name="image"
                                    className="form-control"
                                // onChange={(e) => {
                                //     const [file] = e.target.files[0];
                                //     setFile(e.target.files[0]);
                                // }}
                                />
                            </div>
                            <button className="btn btn-primary">Update Profile</button>
                        </form>
                    </div>
                </div>
            </UserLayout>
            {loading && <CustomeLoader />}
        </>
    );
};

export default UserProfileEdit;
