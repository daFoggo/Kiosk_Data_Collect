import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t bg-muted z-50">
      <div className="p-6 flex justify-between items-center w-full">
        <p className="font-semibold text-sm">Developed by Foggo © 2024</p>
        <Link to="https://github.com/daFoggo/Kiosk_Data_Collect">
          <Button leftIcon={<Github />}>Github</Button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
