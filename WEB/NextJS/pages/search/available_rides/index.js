import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../components/layout';
import { useRouter } from 'next/router';
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import RideCard from '../../../components/RideCard';
import SearchRideContext from "../../../context/state";

const Index = () => {
    const router = useRouter();

    const { searchData } = useContext(SearchRideContext);

    const [userFormData, setUserFormData] = useState({});
    const [availableRidesData, setAvailableRidesData] = useState([]);


    // useEffect(() => {
    //     searchData?.availableRides?.length < 1 && router.push('/search');
    // }, [searchData])

    useEffect(() => {
        setUserFormData(searchData?.fieldsData)
        setAvailableRidesData(searchData?.availableRides)
    }, [searchData])


    return (
        <Layout>
            <section className="search">
                <div className="container">
                    {availableRidesData?.length < 1 ? (
                        <p
                            style={{
                                fontSize: 20,
                                color: 'gray',
                                textAlign: 'center',
                                margin: "40px 0",
                                fontWeight: '500'
                            }}
                        >
                            No Rides available for this route
                        </p>
                    ) : (
                        <div className="searchContent">
                            <div className="searchedCities d-flex flex-row justify-content-start align-items-center">
                                <div>
                                    <BsSearch className="searchIcon" />
                                </div>
                                <div>
                                    <h5>
                                        {userFormData?.goingFrom} <AiOutlineArrowRight className="arrow" />{" "}
                                        {userFormData?.goingTo}
                                    </h5>
                                    <span>
                                        {userFormData?.date}, {userFormData?.passengerNeeded} passenger
                                    </span>
                                </div>
                            </div>
                            <div className="availableRides">
                                <h4>{userFormData?.date}</h4>
                                <p>
                                    {userFormData?.goingFrom} <AiOutlineArrowRight className="arrow" />
                                    {userFormData?.goingTo}
                                </p>
                                <span> {availableRidesData?.length} rides available</span>
                            </div>
                            {availableRidesData?.map((ride, index) => {
                                return (
                                    <div key={index}>
                                        <RideCard
                                            rideData={ride}
                                            userFormData={userFormData}
                                        />
                                    </div>
                                );
                            })}

                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export default Index;

// export const getServerSideProps = (context) => {
//     const availableRides = context?.query?.availableRides;
//     const userFormData = context?.query?.userFormData;
//     const form = context?.query?.form;
//     return {
//         props: {
//             availableRides: JSON.parse(availableRides),
//             userFormData: JSON.parse(userFormData),
//             form: form
//         }
//     }
// }