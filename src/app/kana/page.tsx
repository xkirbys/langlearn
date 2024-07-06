"use client";

import type {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import kanaArray from "./kanaData";

const KanaLearn: NextPage = () => {
    const [displayText, setDisplayText] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
    const [randomKanaPair, setRandomKanaPair] = useState<[string, string]>(["", ""]);
    const [correctCount, setCorrectCount] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [hadError, setHadError] = useState<boolean>(false);

    const getRandomKana = (): [string, string] => {
        const randomIndex: number = Math.floor(Math.random() * kanaArray.length);
        return kanaArray[randomIndex]!;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const newText = event.target.value;
        setInputText(newText);
        if (randomKanaPair[1].startsWith(newText)) {
            if (newText === randomKanaPair[1]) {
                if (!hadError) {
                    setCorrectCount(correctCount + 1);
                }
                setHadError(false);
                setTotalCount(totalCount + 1);
                let newRandomKana = getRandomKana();
                do {
                    newRandomKana = getRandomKana();
                } while (newRandomKana[1] === randomKanaPair[1]);
                setDisplayText(newRandomKana[0]);
                setRandomKanaPair(newRandomKana);
                setInputText(""); // Clear the input field
            }
        } else {
            setHadError(true);
        }
    }

    useEffect(() => {
        const randomkana = getRandomKana();
        setDisplayText(randomkana[0]);
        setRandomKanaPair(randomkana);
    }, []);

    return (
        <div className="w-full relative h-[1080px] overflow-hidden text-center text-[128px] bg-background text-foreground font-sans flex flex-col justify-center items-center">
            <div className="w-[80%] h-[960px] flex flex-col justify-center items-center">
                <h1 className="m-0 text-inherit font-normal font-inherit flex items-center justify-center text-[128px]" id="test">
                    {displayText}
                </h1>
                <Textarea
                    className="w-78 h-fit text-center resize-none text-[48px] align-middle mt-4 flex items-center justify-center"
                    color="primary"
                    value={inputText}
                    onChange={handleInputChange}
                    style={{ lineHeight: '1.2', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: 'fit-content' }}
                />
                {hadError && (
                    <div className="text-red-500 text-[48px] mt-4">
                        (Failed)
                    </div>
                )}
                <div className="w-full text-center text-[48px] align-middle mt-4 flex flex-col items-center justify-center">
                    <div className="flex items-baseline">
                        <p className="m-0 text-inherit font-normal font-inherit text-[128px]">
                            {correctCount}/{totalCount}
                        </p>
                        <span className="m-0 text-inherit font-normal font-inherit text-[128px] ml-2">
                            ({totalCount === 0 ? 0 : ((correctCount/totalCount) * 100).toFixed(2)}%)
                        </span>
                    </div>
                    <p className="text-[24px] text-inherit font-normal">Correct/Total</p>
                </div>
            </div>
        </div>
    );
};

export default KanaLearn;