/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import Link from "next/link";
import { getAllPosts } from "../lib/api";
import { BlogPost } from "@/lib/types";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination"; // Import the Pagination component

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; // Get the search query

  useEffect(() => {
    const fetchPosts = async (page: number) => {
      try {
        // Pass search query to the API function
        const { posts, pagination } = await getAllPosts(page, searchQuery);
        setPosts(posts);
        setTotalPages(pagination.pageCount); // Set the total number of pages
      } catch (error) {
        setError("Error fetching posts.");
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(currentPage);
  }, [currentPage, searchQuery]); // Trigger fetch when currentPage or searchQuery changes

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setLoading(true); // Show loading while new page data is fetched
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      {loading && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {error && <p>{error}</p>}

      {/* Blog Posts */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="cursor-pointer bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <Link href={`/blogs/${post.slug}`} className="block">
                    {post.cover?.url && <div className="relative h-48 w-full">
                      <img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>}
                    <div className="p-4">
                      <h2 className="text-lg font-semibold font-jet-brains text-white line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 mt-2 text-sm leading-6 line-clamp-3">
                        {post.description}
                      </p>
                      <p className="text-purple-400 text-sm mt-4 inline-block font-medium hover:underline">
                        Read More
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No posts available at the moment.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange} // Pass the handler to change pages
          />
        </>
      )}
    </div>
  );
}
