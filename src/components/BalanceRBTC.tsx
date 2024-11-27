import { useAccount, useBalance } from "wagmi";

export default function BalanceRBTC() {
    const { address } = useAccount();
    const {
        data: balance,
        isError,
        isLoading,
    } = useBalance({
        address,
    });

    const formatBalance = (value: string) => {
        if (!value) return "0";
        // Only show first 10 chars on mobile, full balance on larger screens
        const truncated = value.length > 10 ? value.slice(0, 6) + "..." : value;
        return truncated;
    };

    if (isLoading)
        return (
            <div className="mt-2 text-xs sm:text-sm text-gray-400 rounded-lg bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-lg p-2 sm:px-4 sm:py-2">
                Loading balance...
            </div>
        );
    if (isError)
        return (
            <div className="text-xs sm:text-sm text-red-500 rounded-lg bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-lg p-2 sm:px-4 sm:py-2">
                Error fetching balance
            </div>
        );
    if (!address)
        return (
            <div className="w-full justify-center text-center text-xs mt-2 sm:text-sm text-gray-400 rounded-lg bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-lg p-2 sm:px-4 sm:py-2">
                Balance
            </div>
        );

    return (
        <div className="self-end justify-center w-full text-xs sm:text-sm text-gray-200 mt-2 flex flex-wrap items-center gap-1 rounded-lg bg-gradient-to-r from-gray-600/20 to-gray-700/20 backdrop-blur-lg p-2 sm:px-4 sm:py-2">
            <span>Balance:</span>
            <span className="font-medium hidden sm:inline">
                {balance?.formatted ?? "0"}
            </span>
            <span className="font-medium sm:hidden">
                {formatBalance(balance?.formatted ?? "0")}
            </span>
            <span>{balance?.symbol}</span>
        </div>
    );
}
