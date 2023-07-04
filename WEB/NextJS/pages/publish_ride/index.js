import React, { useEffect } from "react";
import Layout from '../../components/layout';
import PublishRideFormCard from "../../components/PublishRideForm";
import AOS from "aos";

const Index = () => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    return (
        <Layout>
            <section
                className="publish-ride-container"
                data-aos="fade-down"
                data-aos-duration="1200"
            >
                <div className="container d-flex justify-content-end">
                    <div className="publish-ride-form ">
                        <PublishRideFormCard />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Index;
