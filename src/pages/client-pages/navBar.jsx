import React from "react";
import { Navbar, Typography, Button, IconButton } from "@material-tailwind/react";

export default function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="flex flex-col items-center gap-4 lg:flex-row lg:gap-6">
      <li>
        <a href="#" className="text-[#FEF9F2] hover:text-[#E4B1F0] font-medium">
          Home
        </a>
      </li>
      <li>
        <a href="#" className="text-[#FEF9F2] hover:text-[#E4B1F0] font-medium">
          Gallery
        </a>
      </li>
      <li>
        <a href="#" className="text-[#FEF9F2] hover:text-[#E4B1F0] font-medium">
          About us
        </a>
      </li>
      <li>
        <a href="#" className="text-[#FEF9F2] hover:text-[#E4B1F0] font-medium">
          Contact us
        </a>
      </li>
    </ul>
  );

  return (
    <Navbar className="bg-gradient-to-r from-[#7E60BF] to-[#E4B1F0] px-4 py-2 lg:px-8 lg:py-4 shadow-none border-none">
      <div className="container flex items-center justify-between mx-auto">
        <Typography
          as="a"
          href="#"
          className="text-2xl text-[#FEF9F2] font-bold tracking-wide"
        >
          WELCOME
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block bg-[#FEF9F2] text-[#7E60BF] hover:bg-[#E4B1F0] hover:text-[#FEF9F2]"
        >
          Book Now
        </Button>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          <span className="material-icons text-[#FEF9F2]">menu</span>
        </IconButton>
      </div>
      {openNav && <div className="lg:hidden">{navList}</div>}
    </Navbar>
  );
}
