import React, { useState } from "react";
import Aside from "./Aside";
import Header from "../userLayout/Header";

const Index = (props) => {
    const [toggle, setToggle] = useState(false);
    return (
        <section style={{ width: "100%", position: "relative" }}>
            <Header toggle={toggle} setToggle={setToggle} />
            <section className="projects-page d-flex flex-row">
                <Aside toggle={toggle} setToggle={setToggle} />
                <main className="px-4 py-4 dashbaord_main">
                    {props.children}
                </main>
            </section>
        </section>
    );
};

export default Index;
