import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import BalanceRBTC from "./BalanceRBTC";
import logo from "../assets/logo.png";

export default function Navbar(): JSX.Element {
    return (
        <nav className="sticky top-4 flex items-center justify-between py-3 px-5 rounded-2xl mt-4 w-full max-w-[1200px] mx-auto bg-gray-600/20 backdrop-blur-lg z-[100]">
            <Link to="/">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-[150px] h-[50px] object-contain bg-primary ring-2 ring-white/50 rounded-xl p-1"
                />
            </Link>
            <div className="flex items-center gap-6">
                <Link to="/prediction" className="text-white hover:text-primary transition-colors">
                    Markets
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <ConnectButton
                    showBalance={false}
                    chainStatus={{ smallScreen: "none", largeScreen: "icon" }}
                />
                <BalanceRBTC />
            </div>
        </nav>
    );
}
