import UserLayout from '../../../components/userLayout';
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import RideRequestCard from "../../../components/RideRequestCard";
import API from '../../../api';
import Loader from '../../../components/CustomeLoader';

const Index = () => {
    const [userRides, setUserRides] = useState([]);
    const [requestedRides, setRequestedRides] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRequestRides = async () => {
        const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
        setLoading(true)
        try {
            const { data } = await API.get(`/requestride`);

            const filter = data?.filter(ride => ride?.publisherUser?._id == user?._id && ride?.rideStatus == "Pending")
            console.log("Requested rides", filter);


            setRequestedRides(data);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    };

    const getUserRides = async () => {
        setLoading(true)
        const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))

        try {
            const { data } = await API.get(`/publishride/user_rides/${user?._id}`);


            setUserRides(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    };

    useEffect(() => {
        // getRequestRides();
        getUserRides();
    }, []);

    return (
        <>
            {/* {loading && <Loader />} */}
            <UserLayout>
                <div className="col-md-9 userProfile-main pb-5">
                    <div className="container">
                        <h2 className="text-center mb-5">Your Rides</h2>
                        <div className="row mb-5">
                            {userRides?.map((ride, index) => {
                                const rideDate = new Date(ride?.date)
                                const rideStatus = rideDate > new Date() ? "Active" : "Completed";
                                const formatedDate = rideDate.toLocaleDateString() + " " + rideDate?.toLocaleTimeString();
                                return (
                                    <div
                                        className="card border-success mb-3 me-3 col-5"
                                        style={{ maxWidth: "18rem" }}
                                        key={index}
                                    >
                                        <div className="card-header bg-transparent border-success">
                                            {ride.goingfrom} <BsArrowRight /> {ride.goingto}
                                        </div>
                                        <div className="card-body text-success">
                                            <p className="card-text">
                                                You have {rideStatus} ride from {ride.goingfrom} to {ride.goingto} on {formatedDate}
                                            </p>
                                        </div>

                                        <div className="card-footer bg-transparent border-success">
                                            Date: {formatedDate}
                                        </div>
                                    </div>
                                );
                            })}
                            {userRides.length == 0 && (
                                <p className='text-center' style={{ fontSize: '16px', fontWeight: '500' }}>There is no record of your previous rides</p>
                            )}
                        </div>
                    </div>
                    <h2 className="text-left pt-5">Ride Requests</h2>
                    <div className='row p-5'>
                        <div className='col-12'>
                            {
                                requestedRides?.map((ride, index) => {
                                    return (
                                        <RideRequestCard
                                            key={index + ""}
                                            ride={ride}
                                            getRequestRides={getRequestRides}
                                        />
                                    );
                                })
                            }
                            {requestedRides.length == 0 && (
                                <p className='text-center' style={{ fontSize: '16px', fontWeight: '500' }}>There is no ride requests</p>
                            )}
                        </div>
                    </div>
                </div>
            </UserLayout>
        </>
    );
};

export default Index;
