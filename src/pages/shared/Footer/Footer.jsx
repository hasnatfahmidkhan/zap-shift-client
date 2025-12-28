import { Link } from "react-router";
import Logo from "../../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-[#0B0B0B] text-accent-content p-10 tracking-wide ">
      <aside>
        <Logo className="text-base-100" />
        <p className="md:w-xl leading-relaxed mt-4">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </aside>
      <nav className="grid md:grid-flow-col gap-4 text-accent-content">
        <Link to={"/"} className="link link-hover">
          Services
        </Link>
        <Link to={"/coverage"} className="link link-hover">
          Coverage
        </Link>
        <Link to={"/about-us"} className="link link-hover">
          About Us
        </Link>
        <Link to={"/send-parcel"} className="link link-hover">
          Send Parcle
        </Link>
      </nav>

      
    
      <p>Copyright © {new Date().getFullYear()} - Door Knock All rights reserved.</p>
    </footer>
  );
};

export default Footer;
