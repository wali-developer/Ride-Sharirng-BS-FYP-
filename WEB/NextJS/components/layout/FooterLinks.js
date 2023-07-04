import React from "react";
import Link from "next/link";

const FooterLinks = ({ FooterCol }) => {
  return FooterCol.map((item, index) => {
    const {
      link1,
      link2,
      link3,
      link4,
      link1url,
      link2url,
      link3url,
      link4url,
    } = item;
    return (
      <div className="col-12 col-sm-6 col-md-4 FooterRowCol" key={index}>
        <ul
          className="nav flex-column"
        >
          <li className="nav-item">
            <Link href={link1url}>
              <span className="nav-link">
                {link1}
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link href={link2url}>
              <span className="nav-link">
                {link2}
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href={link3url}>
              <span className="nav-link">
                {link3}
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href={link4url}>
              <span className="nav-link">
                {link4}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    );
  });
};

export default FooterLinks;
