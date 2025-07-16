"use client";

import { useEffect, useRef, useState } from "react";

type Post = { id: number; title: string; content: string };

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);

    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log({ observer });
    }, [observer]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`api/posts?page=${page}&limit=10`);
            if (!res.ok) throw new Error("Failed to fetch posts");
            const json = await res.json();
            setPosts((prev) => [...prev, ...json.data]);
            setHasMore(json.hasMore);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loading || !hasMore) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1);
            }
        });

        if (sentinelRef.current) {
            observer.current.observe(sentinelRef.current);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Infinite Scroll</h1>

            <ul className="space-y-2">
                {posts.map((post) => (
                    <li key={post.id} className="border p-2 rounded">
                        <p>{post.title}</p>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>

            {loading && <p className="mt-4 text-gray-500">Loading...</p>}
            {error && <p className="mt-4 text-red-500">Error: {error}</p>}
            {!hasMore && !loading && <p className="mt-4 text-gray-500">No more posts.</p>}

            <div ref={sentinelRef} className="h-4 " />
        </div>
    );
}
