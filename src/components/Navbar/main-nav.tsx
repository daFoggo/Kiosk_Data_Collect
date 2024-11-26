import { NavigationMenu } from "@/components/ui/navigation-menu";
import Logo from "@/components/Logo";
import { Link } from "react-router";

const MainNav = () => {
  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <Logo />
      </Link>
      <NavigationMenu></NavigationMenu>
    </div>
  );
};

export default MainNav;
