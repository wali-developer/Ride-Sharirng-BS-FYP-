import { useState } from 'react';
import Link from 'next/link';
import { Dropdown, Button } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { VscGitPullRequest } from "react-icons/vsc";
import {
    IoCarSportOutline,
    IoAddCircleOutline,
    IoCloseOutline,
    IoChatboxOutline,
} from "react-icons/io5";
import { useRouter } from 'next/router';

const Animation = (position) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: position,
                right: "0",
                transition: 'all 300ms ease-in-out',
            }}
        >
            <img src='/images/animation-icon.svg' alt='Circle' />
        </div>
    )
}

const Aside = () => {
    const [position, setPosition] = useState(0);
    const router = useRouter();
    const menu = [
        {
            id: 1,
            name: 'Dashbaord',
            path: '/user/dashboard',
            icon: <MdOutlineDashboard
                className="sidebarMenuIcon"
                style={{
                    color: router.pathname == '/user/dashboard' && '#4f56ff'
                }}
            />
        },
        {
            id: 2,
            name: 'Profile',
            path: '/user/profile',
            icon: <AiOutlineUser
                className="sidebarMenuIcon"
                style={{
                    color: router.pathname == '/user/profile' && '#4f56ff'
                }}
            />
        },
        {
            id: 3,
            name: 'Publish Ride',
            path: '/user/publish_ride',
            icon: <IoAddCircleOutline
                className="sidebarMenuIcon"
                style={{
                    color: router.pathname == '/user/publish_ride' && '#4f56ff'
                }}
            />
        },
        {
            id: 4,
            name: 'Request for Ride',
            path: '/user/ride_requests',
            icon: <IoCarSportOutline
                className="sidebarMenuIcon"
                style={{
                    color: router.pathname == '/user/ride_requests' && '#4f56ff'
                }}
            />
        },
        {
            id: 5,
            name: 'My Rides Requests',
            path: '/user/my_requests',
            icon: <VscGitPullRequest
                className="sidebarMenuIcon"
                style={{
                    color: router.pathname == '/user/my_requests' && '#4f56ff'
                }}
            />
        },
        {
            id: 6,
            name: 'Messaging',
            path: '/user/messaging',
            icon: <IoChatboxOutline
                className="sidebarMenuIcon"
                style={{
                    color: router.pathname == '/user/messaging' && '#4f56ff'
                }}
            />
        },
    ]
    const handleClick = (index) => {
        setPosition(index + 15 + 52 + "px")
    }

    const logout = () => {
        const user = localStorage.getItem('user')
        if (user) {
            localStorage.removeItem('user');
            router.push('/');
        }
    }
    return (
        <>
            <div
                className="userSidebar"
            >
                <div className="sidebar-menu" style={{ position: 'relative' }}>
                    <ul>
                        {menu.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => setPosition(50)}
                                >
                                    {item?.icon}
                                    <Link href={item.path}>
                                        <span
                                            className="ms-4"
                                            style={{
                                                color: item.path === router.pathname && '#4f56ff'
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            )
                        }
                        )}
                    </ul>
                    {/* <Animation position={position} /> */}
                    <div className='' style={{ cursor: 'pointer' }} onClick={logout}>
                        <IoCloseOutline className="sidebarMenuIcon" />
                        <span className="ms-4">
                            Logout
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Aside;
