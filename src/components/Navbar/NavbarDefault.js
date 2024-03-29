import React, { useContext } from "react";
import './NavbarDefault.css';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  FolderIcon,
  RocketLaunchIcon,
  StarIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/auth.context";

const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};


function PlansMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const plansMenuItems = [
    {
      color: "orange",
      icon: RocketLaunchIcon,
      title: "get started",
      description: "get started with yasso",
      link: "/onboarding",
    },
    {
      color: "blue",
      icon: XMarkIcon,
      title: "current plan",
      description: "view your current plan details",
      link: "/current-plan",
    },
  ];

  const renderItems = plansMenuItems.map(({ icon, title, description, color, link }, key) => (
    <Link to={link} key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div className={`rounded-lg p-5 ${colors[color]}`}>
          {React.createElement(icon, { strokeWidth: 2, className: 'h-6 w-6' })}
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="flex items-center text-sm">
            {title}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {description}
          </Typography>
        </div>
      </MenuItem>
    </Link>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 outline-none"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <FolderIcon className="h-[18px] w-[18px]" />
              plans
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-1 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}



function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Link to="dashboard">
        <Typography variant="small" color="blue-gray" className="font-normal">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <StarIcon className="h-[18px] w-[18px]" />
            dashboard
          </ListItem>
        </Typography>
      </Link>
      <Link to="/learn">
        <Typography variant="small" color="blue-gray" className="font-normal">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <BoltIcon className="h-[18px] w-[18px]" />
            learn
          </ListItem>
        </Typography>
      </Link>
      <PlansMenu />
      <Link to="/profile">
        <Typography variant="small" color="blue-gray" className="font-normal">
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <UserCircleIcon className="h-[18px] w-[18px]" />
            profile
          </ListItem>
        </Typography>
      </Link>
    </List>
  );
}

function NavbarDefault() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [openNav, setOpenNav] = React.useState(false);

  const handleLogout = () => {
    logOutUser();
  };

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 navbar-container">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
            yasso
          </Typography>
        </Link>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex">
          {isLoggedIn ? (
            <Button variant="text" size="md" color="blue-gray" onClick={handleLogout} className="lowercase">
              log out
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="text" size="md" color="blue-gray" className="lowercase">
                  log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient" size="md" className="lowercase">
                  sign up
                </Button>
              </Link>
            </>
          )}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {isLoggedIn ? (
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth onClick={handleLogout}>
              log out
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
                  log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient" size="sm" fullWidth>
                  sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarDefault;