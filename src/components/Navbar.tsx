import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import BalanceRBTC from "./BalanceRBTC";

export default function Navbar(): JSX.Element {
    return (
        <nav className="sticky top-4 flex items-center justify-between py-3 px-5 rounded-2xl mt-4 w-full max-w-[1200px] mx-auto bg-gray-600/20 backdrop-blur-lg z-[100]">
            <div className="flex items-center gap-6">
                <Link className="cursor-pointer" to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-[150px] h-[50px] object-contain bg-primary ring-2 ring-white/50 rounded-xl p-1"
                    />
                </Link>
            </div>
            <div className="flex items-center gap-6">
                <Link
                    to="/prediction"
                    className="hover:scale-105 transition-all duration-300 "
                >
                    <h1 className="font-bold font-neueMachinaBold">
                        <span className="text-lg bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl p-3 border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg">
                            Markets
                        </span>
                    </h1>
                </Link>
                <div className="flex flex-col items-center">
                    <ConnectButton
                        showBalance={false}
                        chainStatus={{
                            smallScreen: "none",
                            largeScreen: "icon",
                        }}
                    />
                    <BalanceRBTC />
                </div>
            </div>
        </nav>
    );
}
