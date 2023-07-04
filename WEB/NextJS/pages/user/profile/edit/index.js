import axios from "axios";
import React, { useState } from "react";
import UserLayout from '../../../../components/userLayout';
import { toast } from "react-toastify";

const UserProfileEdit = () => {
    // const [user, setUser] = useState({
    //     id: history.location.state.user.id,
    //     fullName: history.location.state.user.fullName,
    //     userName: history.location.state.user.userName,
    //     email: history.location.state.user.email,
    //     password: history.location.state.user.password,
    //     userType: history.location.state.user.userType,
    // });
    const [file, setFile] = useState();

    // update profile Handler
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch(
                `http://localhost:3001/user/${user.id}`,
                user
            );
            toast.success(data);
        } catch (err) {
            console.log(err);
        }
        history.push("/user-dashboard/profile");
    };
    return (
        <UserLayout>
            <div className="col-md-9 userProfile-main py-5">
                <div className="container">
                    <h2>Edit Profile</h2>
                    <form
                        className="user-Details"
                    // onSubmit={(e) => handleUpdate(e)}
                    >
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                className="form-control"
                            //   onChange={(e) => handleChange(e)}
                            //   value={user.fullName}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">User Name</label>
                            <input
                                type="text"
                                name="userName"
                                className="form-control"
                            //   onChange={(e) => handleChange(e)}
                            //   value={user.userName}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                            //   onChange={(e) => handleChange(e)}
                            //   value={user.email}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                disabled
                            //   onChange={(e) => handleChange(e)}
                            //   value={user.password}
                            />
                        </div>
                        <div className="mb-3 mt-4">
                            <label>User type</label>
                            <select
                                className="mb-4 form-select"
                                aria-label="Default select example"
                                placeholder="User type"
                                name="userType"
                            //   onChange={(e) => handleChange(e)}
                            //   value={user.userType}
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
                            //   onChange={(e) => {
                            //     const [file] = e.target.files[0];
                            //     setFile(e.target.files[0]);
                            //   }}
                            //   accept=".jpg"
                            />
                        </div>
                        <button className="btn btn-primary">Update Profile</button>
                    </form>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserProfileEdit;
