import React, { useState, useEffect } from "react";
import axios from "axios";
import API from '../../../api';
import { Row, Col } from 'react-bootstrap';

import AdminLayout from '../../../components/adminLayout';
import RideStatisticsCard from "../../../components/RideStatisticsCard";
import RideRequestCard from "../../../components/RideRequestCard";
import InactiveRide from "../../../components/admin/InactiveRide";

const AdminDashboard = () => {
    const [ridersLength, setRidersLength] = useState(0);
    const [completedRides, setCompletedRides] = useState(0);
    const [tatalRides, setTotalRides] = useState(0);
    const [cancelledRides, setCancelledRides] = useState(0);
    const [runningRides, setRunningRides] = useState(0);
    const [totalDivers, settotalDrivers] = useState(0);
    const [inactiveRides, setInactiveRides] = useState([]);


    const getAdminDashboard = async () => {
        const { data } = await API.get("user/user-dashboard",
            {
                headers: {
                    token: localStorage.getItem("authToken"),
                },
            }
        );
    };

    // Riders statistics
    const getUsersStatistics = async () => {
        try {
            const { data } = await API.get("/user/register");
            setRidersLength(data.length);

            const drivers = data?.filter((user) => user?.userType === "Driver");
            settotalDrivers(drivers?.length)
        } catch (error) {
            console.log(error);
        }
    };

    // Rides statistics
    const getRidesStatistics = async () => {
        try {
            const { data } = await API.get("/publishride");
            setTotalRides(data?.length);

            const running = data?.filter(ride => ride.status === "Active");
            setRunningRides(running?.length);

            const completed = data?.filter(ride => ride.status === "completed");
            setCompletedRides(completed?.length);

            const cancelled = data.filter((ride) => ride.status === "Cancelled")
            setCancelledRides(cancelled?.length)

            const filterInactiveRides = data.filter((ride) => {
                return ride.status === "Inactive";
            });
            setInactiveRides(filterInactiveRides);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAdminDashboard()
    }, []);

    useEffect(() => {
        getUsersStatistics()
        getRidesStatistics()
    }, []);

    // statistics api
    const StatisticsApi = [
        {
            id: "1",
            title: "Total Riders",
            value: `${ridersLength}`,
            cardIconbg: "#2f978a",
            statisticColbg: "#5ca199",
            icon: "fas fa-user",
        },
        {
            id: "2",
            title: "Total Drivers",
            value: `${totalDivers}`,
            cardIconbg: "#C63535",
            statisticColbg: "#E74E52",
            icon: "fas fa-user-tie",
        },
        {
            id: "3",
            title: "Total Revenue",
            value: "4,60,000",
            cardIconbg: "#329C52",
            statisticColbg: "#3AAD59",
            icon: "fas fa-dollar-sign",
        },
        {
            id: "4",
            title: "Total Rides",
            value: `${tatalRides}`,
            cardIconbg: "#2f978a",
            statisticColbg: "#5ca199",
            icon: "fas fa-car",
        },
        {
            id: "5",
            title: "Cancelled Ride",
            value: `${cancelledRides}`,
            cardIconbg: "#C63535",
            statisticColbg: "#E74E52",
            icon: "fas fa-times",
        },
        {
            id: "6",
            title: "Completed Rides",
            value: `${completedRides}`,
            cardIconbg: "#329C52",
            statisticColbg: "#3AAD59",
            icon: "fas fa-check",
        },
        {
            id: "7",
            title: "Running Rides",
            value: `${runningRides}`,
            cardIconbg: "#C5803E",
            statisticColbg: "#FBA95A",
            icon: "fas fa-car-side",
        },
    ];

    return (
        <AdminLayout admin="admin">
            <div className="adminProfile-main">
                <div className="px-5">
                    <h2 className="text-center">Rides Statistics</h2>
                    <div className="row">
                        {StatisticsApi.map((statistic) => {
                            const { id, title, value, statisticColbg, cardIconbg, icon } =
                                statistic;
                            return (
                                <div className="col-6 col-lg-3" key={id}>
                                    <RideStatisticsCard
                                        title={title}
                                        value={value}
                                        cardIconbg={cardIconbg}
                                        statisticColbg={statisticColbg}
                                        icon={icon}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="row mt-5">
                        {inactiveRides.map((ride) => {
                            const {
                                _id,
                                goingfrom,
                                goingto,
                                name,
                                passenger,
                                date,
                                email,
                            } = ride;
                            return (
                                <InactiveRide
                                    id={_id}
                                    goingfrom={goingfrom}
                                    goingto={goingto}
                                    name={ride?.publisherUser?.fullName}
                                    passenger={passenger}
                                    date={date}
                                    email={ride?.publisherUser?.email}
                                    getRidesStatistics={getRidesStatistics}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
