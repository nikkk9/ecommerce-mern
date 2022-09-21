import React from "react";
import cls from "./Footer.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={cls.footer}>
      <div className={cls.container}>
        <div className={cls.contact}>
          <h1>CONTACT US</h1>
          <div className={cls.contactBox}>
            <a href="mailto:4coderss@gmail.com">
              <button>Contact: Email Us</button>
            </a>
          </div>
        </div>
        <div className={cls.social}>
          <h1>CONNECT WITH US</h1>
          <div className={cls.socialLinks}>
            <Link to="https://github.com/nikkk9">
              <GitHubIcon className={cls.muiIcons} />
            </Link>
            <Link to="https://www.linkedin.com/in/nikk9/">
              <LinkedInIcon className={cls.muiIcons} />
            </Link>
            <Link to="https://www.instagram.com/nikk.9/">
              <InstagramIcon className={cls.muiIcons} />
            </Link>
          </div>
        </div>
      </div>
      <p>&copy; 2022 ECOMM-APP. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
