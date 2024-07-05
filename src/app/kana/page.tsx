"use client";

import type {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea";

const kanaArray: [string,string][] = [
    ['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o'],
    ['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko'],
    ['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so'],
    ['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to'],
    ['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no'],
    ['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho'],
    ['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo'],
    ['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo'],
    ['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro'],
    ['わ', 'wa'], ['を', 'o'],
    ['ん', 'n'],
    ['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'],
    ['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'],
    ['だ', 'da'], ['ぢ', 'ji'], ['づ', 'zu'], ['で', 'de'], ['ど', 'do'],
    ['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo'],
    ['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po'],
    ['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo'],
    ['しゃ', 'sha'], ['しゅ', 'shu'], ['しょ', 'sho'],
    ['ちゃ', 'cha'], ['ちゅ', 'chu'], ['ちょ', 'cho'],
    ['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo'],
    ['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo'],
    ['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo'],
    ['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo'],
    ['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo'],
    ['じゃ', 'ja'], ['じゅ', 'ju'], ['じょ', 'jo'],
    ['ぢゃ', 'ja'], ['ぢゅ', 'ju'], ['ぢょ', 'jo'],
    ['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo'],
    ['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo'],
    ['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o'],
    ['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko'],
    ['サ', 'sa'], ['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so'],
    ['タ', 'ta'], ['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to'],
    ['ナ', 'na'], ['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no'],
    ['ハ', 'ha'], ['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho'],
    ['マ', 'ma'], ['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo'],
    ['ヤ', 'ya'], ['ユ', 'yu'], ['ヨ', 'yo'],
    ['ラ', 'ra'], ['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro'],
    ['ワ', 'wa'], ['ヲ', 'o'],
    ['ン', 'n'],
    ['ガ', 'ga'], ['ギ', 'gi'], ['グ', 'gu'], ['ゲ', 'ge'], ['ゴ', 'go'],
    ['ザ', 'za'], ['ジ', 'ji'], ['ズ', 'zu'], ['ゼ', 'ze'], ['ゾ', 'zo'],
    ['ダ', 'da'], ['ヂ', 'ji'], ['ヅ', 'zu'], ['デ', 'de'], ['ド', 'do'],
    ['バ', 'ba'], ['ビ', 'bi'], ['ブ', 'bu'], ['ベ', 'be'], ['ボ', 'bo'],
    ['パ', 'pa'], ['ピ', 'pi'], ['プ', 'pu'], ['ペ', 'pe'], ['ポ', 'po'],
    ['キャ', 'kya'], ['キュ', 'kyu'], ['キョ', 'kyo'],
    ['シャ', 'sha'], ['シュ', 'shu'], ['ショ', 'sho'],
    ['チャ', 'cha'], ['チュ', 'chu'], ['チョ', 'cho'],
    ['ニャ', 'nya'], ['ニュ', 'nyu'], ['ニョ', 'nyo'],
    ['ヒャ', 'hya'], ['ヒュ', 'hyu'], ['ヒョ', 'hyo'],
    ['ミャ', 'mya'], ['ミュ', 'myu'], ['ミョ', 'myo'],
    ['リャ', 'rya'], ['リュ', 'ryu'], ['リョ', 'ryo'],
    ['ギャ', 'gya'], ['ギュ', 'gyu'], ['ギョ', 'gyo'],
    ['ジャ', 'ja'], ['ジュ', 'ju'], ['ジョ', 'jo'],
    ['ヂャ', 'ja'], ['ヂュ', 'ju'], ['ヂョ', 'jo'],
    ['ビャ', 'bya'], ['ビュ', 'byu'], ['ビョ', 'byo'],
    ['ピャ', 'pya'], ['ピュ', 'pyu'], ['ピョ', 'pyo']
];

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
                    className="w-full text-center text-[48px] align-middle mt-4 flex items-center justify-center"
                    color="primary"
                    value={inputText}
                    onChange={handleInputChange}
                    style={{ lineHeight: '1.2', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
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