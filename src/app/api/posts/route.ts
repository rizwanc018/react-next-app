// used in infinite scroll
import { NextResponse } from "next/server";

const allPosts = Array.from({ length: 100 }).map((_, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
}));

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "10");

    const start = (page - 1) * limit;
    const end = start + limit;
    const data = allPosts.slice(start, end);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
        data,
        hasMore: end < allPosts.length,
    });
}
