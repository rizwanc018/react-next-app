"use client";

import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";

const DebounceHook = () => {
    const [input, setInput] = useState<string>("");
    const debounceValue = useDebounce(input, 300);

    return (
        <div className="w-[440px] mx-auto ">
            <h1 className="text-3xl font-bold text-center mt-6">Debounce Hook</h1>
            <input
                type="text"
                onChange={(e) => {
                    setInput(e.target.value);
                    console.log(e.target.value);
                }}
                className="border w-full p-2 rounded border-[#060606] shadow-sm mt-6"
            />
            <p className="mt-2">Input: {debounceValue}</p>
        </div>
    );
};

export default DebounceHook;
