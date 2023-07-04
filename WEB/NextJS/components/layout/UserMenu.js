import React, { useState } from "react";
import Link from 'next/link';
import { MdOutlineDashboard, MdOutlineWbIridescent } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import {
  IoCarSportOutline,
  IoAddCircleOutline,
  IoReturnUpForwardOutline,
  IoCloseOutline,
  IoPeopleOutline,
  IoWalkOutline,
} from "react-icons/io5";

const UserMenu = ({ user }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAdminDropdown, setOpenAdminDropdown] = useState(false);
  const { userName, email } = user;
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.reload();
  };
  if (email === "waliullah@trusticar.com" && userName === "admin") {
    return (
      <>
        {/* <section style={{ width: "350px", textAlign: "right" }}>
          <Link href="/admin/dashboard">
            <div style={{ cursor: "pointer" }}>
              <span className="LoginUserName">{user.userName}</span>
              <FaUserTie className="NavbarUserIcon" />
            </div>
          </Link>
          <span
            className="dropdown-toggle dropdown-toggle-split"
            id="dropdownMenuReference"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-reference="parent"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <span className="visually-hidden">Toggle Dropdown</span>
          </span>

          <ul
            className="dropdown-menu py-3"
            aria-labelledby="dropdownMenuReference"
            style={{ opacity: openDropdown ? 1 : 0 }}
          >
            <li className="my-2 d-flex align-items-center userMenuRow">
              <MdOutlineDashboard className="userMenuIcon" />
              <Link href={`/admin/dashboard`} >
                <span className="dropdown-item">
                  Admin Dashboard <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li className="my-2 d-flex align-items-center userMenuRow">
              <AiOutlineUser className="userMenuIcon" />
              <Link href="/admin/profile" >
                <span className="dropdown-item">
                  Admin Profile <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li className="my-2 d-flex align-items-center userMenuRow">
              <IoPeopleOutline className="userMenuIcon" />
              <Link href="/admin/riders">
                <span className="dropdown-item">
                  Riders <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li className="my-2 d-flex align-items-center userMenuRow">
              <MdOutlineWbIridescent className="userMenuIcon" />
              <Link href="/admin/rides">
                <span className="dropdown-item">
                  Rides <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li className="my-2 d-flex align-items-center userMenuRow">
              <IoWalkOutline className="userMenuIcon" />
              <Link href="/admin/drivers">
                <span className="dropdown-item">
                  Drivers <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li
              className="my-2 d-flex align-items-center userMenuRow"
              onClick={handleLogout}>
              <IoCloseOutline className="userMenuIcon" />
              <span className="dropdown-item">
                Logout <IoReturnUpForwardOutline className="mx-3" />
              </span>
            </li>
          </ul>
        </section> */}

        {/* admin */}
        <section style={{ width: "350px", textAlign: "right" }}>
          <Link href="/admin/dashboard">
            <span style={{ cursor: "pointer" }}>
              <span className="LoginUserName">{user.fullName}</span>
              <FaUserTie className="NavbarUserIcon" />
            </span>
          </Link>
          <button onClick={() => setOpenAdminDropdown(!openAdminDropdown)} className="user_dropdown_btn">
            <BsChevronDown className="dropdown_icon" />
          </button>
          <ul
            className="dropdown-menu py-3"
            aria-labelledby="dropdownMenuReference"
            style={{ display: openAdminDropdown ? "block" : "none" }}
          >
            <li className="my-2 d-flex align-items-center userMenuRow">
              <MdOutlineDashboard className="userMenuIcon" />
              <Link href={`/admin/dashboard`} >
                <span className="dropdown-item">
                  Admin Dashboard <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li className="my-2 d-flex align-items-center userMenuRow">
              <AiOutlineUser className="userMenuIcon" />
              <Link href="/admin/profile" >
                <span className="dropdown-item">
                  Admin Profile <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li className="my-2 d-flex align-items-center userMenuRow">
              <IoPeopleOutline className="userMenuIcon" />
              <Link href="/admin/riders">
                <span className="dropdown-item">
                  Riders <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li className="my-2 d-flex align-items-center userMenuRow">
              <MdOutlineWbIridescent className="userMenuIcon" />
              <Link href="/admin/rides">
                <span className="dropdown-item">
                  Rides <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li className="my-2 d-flex align-items-center userMenuRow">
              <IoWalkOutline className="userMenuIcon" />
              <Link href="/admin/drivers">
                <span className="dropdown-item">
                  Drivers <IoReturnUpForwardOutline className="mx-3" />
                </span>
              </Link>
            </li>
            <li
              className="my-2 d-flex align-items-center userMenuRow"
              onClick={handleLogout}>
              <IoCloseOutline className="userMenuIcon" />
              <span className="dropdown-item">
                Logout <IoReturnUpForwardOutline className="mx-3" />
              </span>
            </li>
          </ul>
        </section>

      </>


    );
  } else {
    return (
      <section style={{ width: "350px", textAlign: "right" }}>
        <Link href="/user/dashboard">
          <span style={{ cursor: "pointer" }}>
            <span className="LoginUserName">{user.fullName}</span>
            <FaUserTie className="NavbarUserIcon" />
          </span>
        </Link>
        <button onClick={() => setOpenDropdown(!openDropdown)} className="user_dropdown_btn">
          <BsChevronDown className="dropdown_icon" />
        </button>
        <ul
          className="py-3 user_dropdown"
          style={{ opacity: openDropdown ? 1 : 0 }}
        >
          <li className="my-2 d-flex align-items-center userMenuRow">
            <MdOutlineDashboard className="userMenuIcon" />
            <Link href={`/user/dashboard`}>
              <span className="dropdown-item">
                User Dashboard <IoReturnUpForwardOutline className="mx-3" />
              </span>
            </Link>
          </li>
          <li className="my-2 d-flex align-items-center userMenuRow">
            <AiOutlineUser className="userMenuIcon" />
            <Link href="/user/profile">
              <span className="dropdown-item">
                User Profile <IoReturnUpForwardOutline className="mx-3" />
              </span>
            </Link>
          </li>
          <li className="my-2 d-flex align-items-center userMenuRow">
            <IoAddCircleOutline className="userMenuIcon" />
            <Link href="/user/publishride">
              <span className="dropdown-item">
                Publish Ride <IoReturnUpForwardOutline className="mx-3" />
              </span>
            </Link>
          </li>
          <li className="my-2 d-flex align-items-center userMenuRow">
            <IoCarSportOutline className="userMenuIcon" />
            <Link href="/user/ride_requests">
              <span className="dropdown-item">
                Request for a Ride <IoReturnUpForwardOutline className="mx-3" />
              </span>
            </Link>
          </li>
          <li className="my-2 d-flex align-items-center userMenuRow">
            <IoCloseOutline className="userMenuIcon" />
            <span
              className="dropdown-item"
              onClick={handleLogout}
            >
              Logout <IoReturnUpForwardOutline className="mx-3" />
            </span>
          </li>
        </ul>
      </section>
    );
  }
};

export default UserMenu;
