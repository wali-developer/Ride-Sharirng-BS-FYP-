import React from "react";
import SearchRide from '../../components/SearchRide'
import Head from "next/head";

import Layout from '../../components/layout';

const Index = () => {
    return (
        <>
            <Head>
                <title>Trusticar -  Search Ride</title>
                <meta name="description" content="TrustiCar Ride search page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <section className="search__page">
                    <div className=" ">
                        <div className="search_wrapper ">
                            <SearchRide />
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Index