import Link from "next/link";

export default function Home() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <ul className=" text-blue-800 underline list-disc ">
                <li>
                    <Link href="/debouncehook">Debounce Hook</Link>
                </li>
                <li>
                    <Link href="/infinite-scroll">Infinite Scroll</Link>
                </li>
            </ul>
        </div>
    );
}
