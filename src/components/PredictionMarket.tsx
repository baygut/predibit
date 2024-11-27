import { useState } from "react";
import { useAccount, useBalance, useSendTransaction } from "wagmi";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parseEther } from "viem";
import { Loader } from "lucide-react";

interface Prediction {
    id: number;
    question: string;
    yesPool: number;
    noPool: number;
    endTime: Date;
}

export default function PredictionMarket() {
    const { address } = useAccount();
    const [amount] = useState("0.00001"); // Default amount in RBTC
    const { data: balance } = useBalance({
        address,
    });

    const predictions: Prediction[] = [
        {
            id: 1,
            question: "Will Bitcoin reach $100k by the end of 2024?",
            yesPool: 1.5,
            noPool: 0.8,
            endTime: new Date("2024-12-31"),
        },
        {
            id: 2,
            question:
                "Will Ethereum switch to a new consensus mechanism in 2024?",
            yesPool: 2.1,
            noPool: 1.2,
            endTime: new Date("2024-12-31"),
        },
        {
            id: 3,
            question: "Will RSK achieve 100k daily active users by Q3 2024?",
            yesPool: 0.9,
            noPool: 1.1,
            endTime: new Date("2024-09-30"),
        },
        {
            id: 4,
            question:
                "Will a Bitcoin spot ETF be approved in the US by July 2024?",
            yesPool: 3.2,
            noPool: 1.8,
            endTime: new Date("2024-07-31"),
        },
        {
            id: 5,
            question: "Will DeFi TVL on RSK exceed $1B in 2024?",
            yesPool: 1.7,
            noPool: 1.3,
            endTime: new Date("2024-12-31"),
        },
        {
            id: 6,
            question: "Will any major central bank launch a CBDC in 2024?",
            yesPool: 2.5,
            noPool: 2.2,
            endTime: new Date("2024-12-31"),
        },
        {
            id: 7,
            question: "Will NFT trading volume surpass 2023 levels?",
            yesPool: 1.2,
            noPool: 1.8,
            endTime: new Date("2024-12-31"),
        },
        {
            id: 8,
            question:
                "Will any new layer 2 solution reach 1M daily transactions?",
            yesPool: 1.6,
            noPool: 1.4,
            endTime: new Date("2024-12-31"),
        },
        {
            id: 9,
            question: "Will RSK implement a major protocol upgrade in 2024?",
            yesPool: 2.0,
            noPool: 1.0,
            endTime: new Date("2024-12-31"),
        },
        {
            id: 10,
            question: "Will crypto market cap exceed $5T in 2024?",
            yesPool: 2.8,
            noPool: 1.9,
            endTime: new Date("2024-12-31"),
        },
    ];

    // Using a dummy contract address for demonstration
    const dummyContractAddress = "0x0000000000000000000000000000000000000000";

    const { sendTransaction: sendYes, isPending: isLoadingYes } =
        useSendTransaction();

    const { sendTransaction: sendNo, isPending: isLoadingNo } =
        useSendTransaction();

    const handleYes = async () => {
        try {
            sendYes({
                to: dummyContractAddress,
                value: parseEther(amount),
            });
        } catch (error) {
            console.error("Error sending transaction:", error);
        }
    };

    const handleNo = async () => {
        try {
            sendNo({
                to: dummyContractAddress,
                value: parseEther(amount),
            });
        } catch (error) {
            console.error("Error sending transaction:", error);
        }
    };

    const insufficientBalance =
        balance && parseFloat(balance.formatted) < parseFloat(amount);

    return (
        <div className="max-w-[800px] mx-auto p-4">
            {(isLoadingYes || isLoadingNo) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl flex flex-col items-center gap-4">
                        <Loader className="animate-spin text-white w-12 h-12" />
                        <p className="text-white text-lg">
                            Processing {isLoadingYes ? "Yes" : "No"}{" "}
                            Prediction...
                        </p>
                    </div>
                </div>
            )}
            {predictions.map((prediction) => (
                <Card
                    key={prediction.id}
                    className="p-6 bg-gray-800/20 backdrop-blur-lg mb-6"
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">
                        {prediction.question}
                    </h2>

                    <div className="flex justify-between mb-6">
                        <div>
                            <p className="text-gray-300">Yes Pool</p>
                            <p className="text-xl font-bold text-white">
                                {prediction.yesPool} RBTC
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-300">No Pool</p>
                            <p className="text-xl font-bold text-white">
                                {prediction.noPool} RBTC
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-300">Ends</p>
                            <p className="text-xl font-bold text-white">
                                {prediction.endTime.toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button
                            onClick={handleYes}
                            disabled={
                                !address || insufficientBalance || isLoadingYes
                            }
                            className="bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-500"
                        >
                            {isLoadingYes
                                ? "Predicting..."
                                : `Predict Yes (${amount} RBTC)`}
                        </Button>
                        <Button
                            onClick={() => handleNo()}
                            disabled={
                                !address || insufficientBalance || isLoadingNo
                            }
                            className="bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-500"
                        >
                            {isLoadingNo
                                ? "Predicting..."
                                : `Predict No (${amount} RBTC)`}
                        </Button>
                    </div>

                    {!address && (
                        <p className="text-center mt-4 text-yellow-500">
                            Please connect your wallet to make predictions
                        </p>
                    )}
                    {address && insufficientBalance && (
                        <p className="text-center mt-4 text-red-500">
                            Insufficient balance. You need at least {amount}{" "}
                            RBTC to make a prediction.
                        </p>
                    )}
                </Card>
            ))}
        </div>
    );
}
