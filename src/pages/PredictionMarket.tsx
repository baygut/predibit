import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAccount, useBalance } from "wagmi";

interface Prediction {
    id: number;
    question: string;
    creator: string;
    yesPool: number;
    noPool: number;
    endTime: Date;
}

export default function PredictionMarket() {
    const { address } = useAccount();
    const { data: balance } = useBalance({
        address: address,
    });

    const [predictions, setPredictions] = useState<Prediction[]>([
        {
            id: 1,
            question: "Will Bitcoin reach $100,000 by end of 2024?",
            creator: "0x123...",
            yesPool: 2.5,
            noPool: 1.8,
            endTime: new Date("2024-12-31"),
        },
    ]);

    const [newPrediction, setNewPrediction] = useState("");

    const createPrediction = () => {
        if (!newPrediction) return;

        const prediction: Prediction = {
            id: predictions.length + 1,
            question: newPrediction,
            creator: address || "0x",
            yesPool: 0,
            noPool: 0,
            endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        };

        setPredictions([...predictions, prediction]);
        setNewPrediction("");
    };

    const placeBet = (predictionId: number, isYes: boolean) => {
        // Mock function - would interact with smart contract in production
        setPredictions(
            predictions.map((p) => {
                if (p.id === predictionId) {
                    if (isYes) {
                        return { ...p, yesPool: p.yesPool + 0.1 };
                    } else {
                        return { ...p, noPool: p.noPool + 0.1 };
                    }
                }
                return p;
            })
        );
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Predibit</h1>
                <p className="text-xl">
                    Your RBTC Balance: {balance?.formatted || "0"}{" "}
                    {balance?.symbol}
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                    Create New Prediction
                </h2>
                <div className="flex gap-4">
                    <Input
                        value={newPrediction}
                        onChange={(e) => setNewPrediction(e.target.value)}
                        placeholder="Enter your Bitcoin prediction question..."
                        className="flex-1"
                    />
                    <Button onClick={createPrediction}>Create</Button>
                </div>
            </div>

            <div className="grid gap-6">
                <h2 className="text-2xl font-bold">Active Predictions</h2>
                {predictions.map((prediction) => (
                    <Card key={prediction.id} className="p-6">
                        <h3 className="text-xl font-semibold mb-4">
                            {prediction.question}
                        </h3>
                        <div className="flex justify-between mb-4">
                            <div>
                                <p>Yes Pool: {prediction.yesPool} RBTC</p>
                                <Button
                                    onClick={() =>
                                        placeBet(prediction.id, true)
                                    }
                                    className="mt-2"
                                >
                                    Bet Yes (0.1 RBTC)
                                </Button>
                            </div>
                            <div>
                                <p>No Pool: {prediction.noPool} RBTC</p>
                                <Button
                                    onClick={() =>
                                        placeBet(prediction.id, false)
                                    }
                                    className="mt-2"
                                >
                                    Bet No (0.1 RBTC)
                                </Button>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            <p>Created by: {prediction.creator}</p>
                            <p>
                                Ends: {prediction.endTime.toLocaleDateString()}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
