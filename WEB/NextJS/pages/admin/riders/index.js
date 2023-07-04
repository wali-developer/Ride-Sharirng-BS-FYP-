import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../../../components/UserCard";
import { toast } from "react-toastify";
import AdminLayout from '../../../components/adminLayout';
import API from '../../../api';
import Loader from '../../../components/CustomeLoader';

const Riders = () => {
    const [riders, setRiders] = useState([]);
    const [search, setSearch] = useState("");
    const [searhUser, setSearhUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getDrivers = async () => {
            try {
                const { data } = await API.get("/user/register");
                setRiders(data);
            } catch (err) {
                console.log(err);
            }
        };
        getDrivers();
    });

    const handleSearch = (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const filterUser = riders.filter((user) => user.fullName === search);
            if (filterUser.length === 0) {
                toast.error("No user found");
            } else {
                setSearhUser(filterUser);
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <>
            {loading && (<Loader />)}
            <AdminLayout>
                <div className="userProfile-main px-5">
                    <div className="">
                        <h2 className="mb-4">Riders</h2>
                        <form
                            onSubmit={(e) => handleSearch(e)}
                        >
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{ height: '50px' }}
                                    id="Search"
                                    placeholder="Search for Rider / User..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            </div>
                            <div className=" my-2">
                                <button type="submit" className="btn btn-primary" style={{ height: '45px', width: '100px', fontSize: '15px' }}>
                                    Search
                                </button>
                            </div>
                        </form>
                        <div className="row mt-5">
                            <div className="col-md-7">
                                {searhUser?.map((user, index) => {
                                    return (
                                        <UserCard
                                            key={index}
                                            fullName={"Wali Ullah"}
                                            email={"waliullah@gmail.com"}
                                            userType={"Passenger"}
                                            date={"23 Aug, 2022"}
                                        />
                                    );
                                })}
                            </div>
                            <div className="col-md-5 mx-auto">
                                {riders?.map((driver, index) => {
                                    return (
                                        <div className="card mb-4 px-4 py-2" key={index}>
                                            <div className="row g-0">
                                                <div className="col-md-4">
                                                    <img
                                                        src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
                                                        className="img-fluid rounded-start"
                                                        alt="user"
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{driver?.fullName}</h5>
                                                        <p className="card-text">{driver?.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default Riders;
