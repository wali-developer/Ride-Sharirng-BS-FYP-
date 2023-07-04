import React from 'react'
import Head from 'next/head';
import Layout from '../../components/layout';

const index = () => {
    return (
        <>
            <Head>
                <title>Trusticar - Contact Us</title>
                <meta name="description" content="TrustiCar Contact Us page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <section>
                    <div className="container">
                        <div className="contact">
                            <div className=" contactCol1">
                                <h1>Connect with us</h1>
                                <p>
                                    Submit your query and we will get back to you as soon as possible.
                                </p>
                            </div>
                            <div className=" contactCol2">
                                {/* Form */}
                                <form>
                                    <div className="row inputs">
                                        <div className="col-12 col-lg-6 mb-4">
                                            <label htmlFor="First Name" className="form-label"></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                placeholder="First Name..."
                                            />
                                        </div>
                                        <div className="col-12 col-lg-6 mb-4">
                                            <label htmlFor="Last Name" className="form-label"></label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Last Name..."
                                                name="lastName"
                                            />
                                        </div>
                                        <div className="col-12 col-lg-6 mb-3">
                                            <label htmlFor="Phone Number" className="form-label"></label>
                                            <input
                                                type="phone number"
                                                className="form-control"
                                                placeholder="Phone Number..."
                                                name="phoneNumber"
                                            />
                                        </div>
                                        <div className="col-12 col-lg-6 mb-4">
                                            <label htmlFor="Your Email" className="form-label"></label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Your Email..."
                                                name="email"
                                            />
                                        </div>
                                        <div className="col-12 col-lg-12 mb-4">
                                            <label htmlFor="Subject" className="form-label"></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Subject..."
                                                name="subject"
                                            />
                                        </div>
                                        <div className="col-12 col-lg-12 mb-4">
                                            <label htmlFor="Message" className="form-label"></label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Discribe your issue..."
                                                name="message"
                                            ></textarea>
                                        </div>
                                        <div className="form-check my-3 mb-5">
                                            <input type="checkbox" className="form-check-input" />
                                            <label className="form-check-label mx-3" htmlFor="exampleCheck1">
                                                I agree to the terms and Conditions
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-primary formBtn">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>

        </>
    )
}

export default index