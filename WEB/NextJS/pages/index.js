import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import AOS from "aos";
import { useRouter } from 'next/router';

import Layout from '../components/layout';
import SearchRide from '../components/SearchRide';
import servicesApi from "../api/serviceApi";
import SinglePopularRide from '../components/SinglePopularRide'
import { toast } from 'react-toastify';

export default function HomePage() {

  const [services, setServices] = useState(servicesApi);
  const [showPopularRides, setShowPopularRides] = useState();
  const router = useRouter();

  const handleClick = () => {
    if (localStorage.getItem('user')) {
      router.push('/publish_ride')
    } else {
      toast.error("Please login to Publish the ride")
      router.push('/auth/login');
    }
  }
  return (
    <>
      <Head>
        <title>TrustiCar</title>
        <meta name="description" content="TrustiCar Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section>
          <div className="header">
            <div className="row mainRow d-flex flex-row flex-wrap justify-content-center align-items-center">
              <div className="col-12 col-md-6 mainRowCol1">
                <SearchRide />
              </div>
              <div
                className="col-12 col-md-6 mainRowCol2"
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                <img
                  src="images/main.svg"
                  className="img-fluid"
                  alt="Man with Ride"
                />
              </div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 240"
            style={{ marginTop: "-10%" }}
          >
            <path
              fill="#898DFF"
              fillOpacity="1"
              d="M0,32L120,74.7C240,117,480,203,720,218.7C960,235,1200,181,1320,154.7L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </section>

        {/* Ride Services */}
        <section className="RideServiceContainer">
          <div className="ride-services container">
            <div className="row RideServicesRow">
              {services.map((service, index) => {
                const { icon, heading, text, linkTo } = service;
                return (
                  <div
                    className="col-12 col-md-4 RideServicesRowCol"
                    key={index}
                    data-aos="zoom-in"
                    data-aos-duration="1500"
                  >
                    <i className={`serviceIcon ${icon}`} />
                    <Link href={linkTo}>
                      <h4>{heading}</h4>
                    </Link>
                    <p className="text-white">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Publish Ride */}
        <section className="publish-ride">
          <div className="container" style={{ padding: 0 }}>
            <div
              className="row publish-rideRow d-flex justify-content-center align-items-center"
              data-aos="fade-right"
              data-aos-duration="1200"
            >
              <div className="col-12 col-md-6 publish-rideRow-col1">
                <h2>Want to drive ?</h2>
                <p>{"Let's"} make your journey more momoriable and comfortable, <br /> Publish your own ride</p>
                <Link href="/publish_ride">
                  <button
                    className="btn btn-outline-success"
                    onClick={handleClick}
                  >
                    Publish Your Ride
                  </button>
                </Link>
              </div>
              <div
                className="col-12 col-md-6"
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                <img
                  src="images/publishRide.svg"
                  alt="Publish Ride"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="popularRides">
          <div className="container">
            <h2 data-aos="zoom-in" data-aos-duration="1000">
              Our Popular and Latest Rides
            </h2>
            <div className="row popularRidesRow">
              <SinglePopularRide GoingFrom="Peshawar" GoingTo="Islamabad" />
              <SinglePopularRide GoingFrom="Lahore" GoingTo="Peshawar" />
              <SinglePopularRide GoingFrom="Karachi" GoingTo="Lahore" />
              <SinglePopularRide GoingFrom="Islamabad" GoingTo="Abbottabad" />
            </div>
            {showPopularRides ? (
              <div>
                <div className="row popularRidesRow">
                  <SinglePopularRide GoingFrom="Multan" GoingTo="Mansehra" />
                  <SinglePopularRide GoingFrom="Muree" GoingTo="Kohat" />
                  <SinglePopularRide GoingFrom="Battagram" GoingTo="Thakot" />
                  <SinglePopularRide GoingFrom="Thakot" GoingTo="Chattar plan" />
                </div>
              </div>
            ) : null}

            <div className="see-more">
              <button
                className="btn btn-primary"
                onClick={() => setShowPopularRides(!showPopularRides)}
              >
                {showPopularRides ? "See Less" : "See More"}
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
