import PredictionMarket from "@/components/PredictionMarket";

export function Home() {
    return (
        <main className="max-w-[1100px] mx-auto">
            <section className="mx-auto flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-[3em] md:text-[4em] lg:text-[7em] flex flex-col gap-5 text-center font-bold font-neueMachinaBold text-balance md:leading-[auto] lg:leading-tight text-black">
                    <span className="bg-orange-400 lg:pt-5 px-2 leading-tight">
                        PrediBit
                    </span>
                </h1>
                <p className="text-[1.5em] md:text-[2em] mt-4 text-center font-bold">
                    Decentralized Prediction Markets on Bitcoin
                </p>
            </section>

            <PredictionMarket />
        </main>
    );
}
