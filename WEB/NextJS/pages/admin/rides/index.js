import React from "react";
import { useEffect, useState } from "react";
import LatestRides from "../../../components/admin/LatestRides";
import AdminLayout from '../../../components/adminLayout';
import API from '../../../api';
import Loader from '../../../components/CustomeLoader';

const Rides = () => {
    const [rides, setRides] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const getPublishRides = async () => {
            try {
                setLoader(true)
                const { data } = await API.get("/publishride");
                if (data) {
                    setRides(data);
                }
                setLoader(false);
            } catch (err) {
                console.log(err);
            }
        };
        getPublishRides();
    }, []);
    return (
        <>
            {loader && (<Loader />)}
            <AdminLayout>
                <div className="col-md-9 userProfile-main">
                    <div className="container">
                        <h2>Total Rides</h2>
                        {rides?.map((ride, index) => {
                            return (
                                <LatestRides
                                    key={index + ""}
                                    passenger={ride?.passenger}
                                    goingfrom={ride?.goingfrom}
                                    goingto={ride?.goingto}
                                    date={ride?.date}
                                    name={ride?.publisherUser?.fullName}
                                />
                            );
                        })}
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default Rides;
