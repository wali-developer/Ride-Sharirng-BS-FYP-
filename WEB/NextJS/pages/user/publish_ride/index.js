import React from 'react';
import UserLayout from '../../../components/userLayout';
import PublishRideForm from "../../../components/PublishRideForm";

const UserPublishRide = () => {
    return (
        <UserLayout>
            <div className="userProfile-main">
                <div className="container">
                    <PublishRideForm />
                </div>
            </div>
        </UserLayout>
    );
};

export default UserPublishRide;
