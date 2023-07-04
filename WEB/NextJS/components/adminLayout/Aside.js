import { useState } from 'react';
import Link from 'next/link';
import { RiLogoutCircleLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { ImUsers } from "react-icons/im";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import {
    IoCarSportOutline,

} from "react-icons/io5";
import { useRouter } from 'next/router';

const Aside = () => {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState();
    const menu = [
        {
            id: 1,
            name: 'Dashbaord',
            path: '/admin/dashboard',
            icon: <MdOutlineDashboard
                className='sidebarMenuIcon'
                style={{
                    color: '/admin/dashboard' === router.pathname && '#4f56ff'
                }}
            />
        },
        {
            id: 2,
            name: 'Profile',
            path: '/admin/profile',
            icon: <AiOutlineUser
                className='sidebarMenuIcon'
                style={{
                    color: '/admin/profile' === router.pathname && '#4f56ff'
                }}
            />
        },
        {
            id: 3,
            name: 'Riders',
            path: '/admin/riders',
            icon: <ImUsers
                className='sidebarMenuIcon'
                style={{
                    color: '/admin/riders' === router.pathname && '#4f56ff'
                }}
            />
        },
        {
            id: 4,
            name: 'Rides',
            path: '/admin/rides',
            icon: <IoCarSportOutline
                className='sidebarMenuIcon'
                style={{
                    color: '/admin/rides' === router.pathname && '#4f56ff'
                }}
            />
        },
        {
            id: 5,
            name: 'Drivers',
            path: '/admin/drivers',
            icon: <FiUsers
                className='sidebarMenuIcon'
                style={{
                    color: '/admin/drivers' === router.pathname && '#4f56ff'
                }}
            />
        },
    ]

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
                <div className="sidebar-menu">
                    <ul>
                        {menu.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {item.icon}
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
                        <li>
                            <RiLogoutCircleLine
                                className='sidebarMenuIcon'
                                onClick={() => {
                                    setSelectedItem(item)
                                    handleLogout()
                                }}
                            />
                            <span
                                className="ms-4"
                                onClick={logout}
                            >
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Aside;
