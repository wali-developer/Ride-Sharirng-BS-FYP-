import React, { useState, useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import API from "../../../api/index";
import Layout from '../../../components/userLayout'
import Loader from '../../../components/CustomeLoader'

const Index = () => {
    const [requestedRides, setRequestedRides] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loginUser = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setUser(loginUser)
        }
    }, []);

    const getRequestRides = async () => {
        setLoading(true)
        try {
            const { data } = await API.get("/requestride");
            const filterRides = await data?.filter(ride => ride?.bookingRider?.id == user?._id);
            setRequestedRides(filterRides);
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    };
    useEffect(() => {
        getRequestRides();
    }, []);

    const getPublisher = async (publisherId) => {
        try {
            const { data } = await API.get(`user/${publisherId}`);
            return data

        } catch (error) {
            console.log(error)
        }
        // console.log(data)
    };

    return (
        <>
            {loading && (<Loader />)}
            <Layout>
                <div className="col-md-9 userProfile-main">
                    <div className="container">
                        {requestedRides?.map((ride, index) => {
                            const {
                                goingfrom,
                                goingto,
                                rideStatus,
                                requestStatus,
                                bookingDate,
                                passenger,
                                publisherId,
                                rejectionReason
                            } = ride;
                            const data = getPublisher(publisherId);
                            return (
                                <div
                                    className="searchCard"
                                    key={index}
                                >
                                    <div className="">
                                        <div className="searchCard-content row">
                                            <div className="searchCard-content-col col-sm-2 col-md-2">
                                                <h5>18:00</h5>
                                                <p>2hr40</p>
                                                <h5>20:40</h5>
                                            </div>
                                            <div className="searchCard-content-col col-sm-8 col-md-8">
                                                <h5>
                                                    <GrLocation />
                                                    {goingfrom}
                                                </h5>
                                                <BsArrowDown className="my-2" />
                                                <h5>
                                                    <GrLocation />
                                                    {goingto}
                                                </h5>
                                            </div>
                                            <p className="price col-sm-2 col-md-2">800 pkr</p> <br />
                                        </div>
                                        <div className="d-flex justify-content-between align-items-end">
                                            <div className="cardUser">
                                                <p>
                                                    You booked a given ride with <strong>{passenger}</strong>{" "}
                                                    passenger {passenger > 1 ? "s" : ""} on Date :{" "}
                                                    {bookingDate}
                                                </p>
                                            </div>
                                        </div>

                                        {requestStatus === "Rejected" ? (
                                            <div>
                                                <span>Ride Publisher Rejection message : </span> <br />
                                                <h6>{rejectionReason}</h6>
                                            </div>
                                        ) : null}
                                        <div className="my-2 mt-3 d-flex justify-content-between">
                                            <button className="btn primaryBtn" disabled>
                                                {rideStatus}
                                            </button>
                                            <button className="btn primaryBtn" disabled>
                                                {requestStatus}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Index;
