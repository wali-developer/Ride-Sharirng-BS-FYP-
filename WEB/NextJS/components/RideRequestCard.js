import axios from "axios";
import React, { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api";
import Modal from '../components/modal';
import { Button } from "react-bootstrap";

const RideRequestCard = ({
    ride,
    getRequestRides
}) => {
    const [rejectionMessage, setRejectionMessage] = useState("");
    const [openModal, setOpenModal] = useState(false);

    // handle approve ride request
    const handleApprove = async () => {
        try {

            const { data } = await API.patch(
                `/requestride/${ride?._id}`,
                {
                    requestStatus: "Accepted",
                }
            );
            if (data) {
                toast.success("You have accepted the ride request");
                console.log("Accepted ride: ", data)
            } else {
                toast(data);
            }

            // Update ride passengers
            await API.patch(`/publishride/${ride?.rideId}`, {
                passenger: passenger - passenger,
            });

        } catch (err) {
            console.log(err);
        }
    };

    // handle disapprove ride request
    const handleDisapprove = async () => {
        try {
            const { data } = await API.patch(
                `/requestride/${ride?._id}`,
                {
                    requestStatus: "Rejected",
                    rejectionReason: rejectionMessage,
                }
            );
            if (data) {
                toast("You have rejected the ride request");
                console.log(data);
            } else {
                alert(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getRequestRides();
    }, [handleApprove, handleDisapprove])

    return (
        <>
            {ride?.requestStatus == "Pending" && (
                <div className="card text-center mb-4">
                    <div className="card-header" style={{ textAlign: "left" }}>
                        Booking Ride Request from {ride?.goingfrom} to {ride?.goingto}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">
                            {ride?.goingfrom} <BsArrowRight /> {ride?.goingto}
                        </h5>
                        <p className="card-text">
                            User <b> {ride?.bookingRider?.fullName} </b> email <b>{ride?.bookingRider?.email}</b> has requested to book your ride with <b>{ride?.passenger}</b> passengers on {ride?.bookingDate}, you can either Approve or Disapprove
                        </p>
                        <div className="d-flex justify-content-between">
                            <button className="btn primaryBtn" onClick={handleApprove}>
                                Approve
                            </button>
                            <button
                                type="button"
                                href="/"
                                className="btn primaryBtn"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => setOpenModal(true)}
                            >
                                Disapprove
                            </button>
                        </div>

                    </div>
                    <div className="card-footer text-muted">{ride?.bookingDate}</div>
                </div>
            )}
            {/* Rejection modal */}
            <Modal show={openModal} setShow={setOpenModal} className="">
                <div className="">
                    <h5 className="text-center" style={{ fontFamily: 'Poppins' }}>Rejection Reason</h5>
                    <div className="modal-body">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Tell the Request sender why you are rejected his ride request "
                            onChange={(e) => setRejectionMessage(e.target.value)}
                            value={rejectionMessage}
                        ></textarea>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setOpenModal(false)}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn primaryBtn"
                            onClick={handleDisapprove}
                        >
                            Dissapprove Request
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default RideRequestCard;
