import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UserCard from "../../../components/UserCard";
import AdminLayout from '../../../components/adminLayout';
import API from '../../../api';
import Loader from "../../../components/CustomeLoader";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [search, setSearch] = useState("");
    const [searhUser, setSearhUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getDrivers = async () => {
            try {
                setLoading(true);
                const { data } = await API.get("/user/register");
                if (data) {
                    setDrivers(data.filter((driver) => driver.userType === "Driver"));
                }
                setLoading(false)
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
            const filterDriver = drivers.filter((driver) => driver.fullName === search);
            if (filterDriver.length === 0) {
                toast.error("No driver found with provided name");
            } else {
                setSearhUser(filterDriver);
            }
            setSearhUser(filterDriver);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }


    };
    return (
        <AdminLayout>
            <div className="userProfile-main">
                <div className="container">
                    <h2 className="mb-5">Drivers</h2>
                    <form
                        onSubmit={handleSearch}
                    >
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="Search"
                                placeholder="Search for Driver..."
                                style={{ height: '45px' }}
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                        </div>
                        <div className="my-2">
                            <button type="submit" className="btn btn-primary" style={{ height: '40px', width: '100px' }}>
                                Search
                            </button>
                        </div>
                    </form>
                    <div className="row mt-5">
                        <div className="col-md-7">
                            {searhUser?.map((driver, index) => {
                                const { fullName, email, userType, date } = driver;
                                return (
                                    <UserCard
                                        fullName={fullName}
                                        email={email}
                                        userType={userType}
                                        date={date}
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                        <div className="col-md-5">
                            {drivers?.map((driver, index) => {
                                return (
                                    <div className="card mb-4 py-2 px-3" key={index}>
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
    );

};

export default Drivers;
