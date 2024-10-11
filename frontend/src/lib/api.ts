import axios from "axios";
import { UserBlogPostData } from "./types";
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://localhost:1337/api",
});

// Get all posts with optional search query and pagination (4 posts per page)
const PAGE_SIZE = 4;
export const getAllPosts = async (
  page: number = 1,
  searchQuery: string = ""
) => {
  console.log(`Fetching from: ${process.env.NEXT_PUBLIC_STRAPI_URL}`);
  try {
    // If search query exists, filter posts based on title
    const searchFilter = searchQuery
      ? `&filters[title][$containsi]=${searchQuery}`
      : "";
    const response = await api.get(
      `/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}${searchFilter}`
    );
    return {
      posts: response.data.data,
      pagination: response.data.meta.pagination, // Include pagination data
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Server error");
  }
};

// Get document ID by slug
export const getDocumentIdBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/blogs?filters[slug]=${slug}&populate=*`);
    if (response.data.data.length > 0) {
      return response.data.data[0].documentId; // Return the post ID
    }
    throw new Error("Post not found.");
  } catch (error) {
    console.error("Error fetching document ID:", error);
    throw new Error("Server error");
  }
};

// Get a post by document ID
export const getPostById = async (id: string) => {
  try {
    const response = await api.get(`/blogs/${id}?populate=*`);
    return response.data.data; // Return the post directly
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Server error");
  }
};
export const getPostBySlug = async (slug: string) => {
  try {
    const response = await api.get(
      `/api/blogs?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data.data; // Return all categories
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Server error");
  }
};

// Upload image with correct structure for referencing in the blog
export const uploadImage = async (image: File, refId: number) => {
  try {
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::blog.blog"); // ref: Strapi content-type name
    formData.append("refId", refId.toString()); // refId: Blog post ID
    formData.append("field", "cover"); // field: Image field name in the blog

    const response = await api.post("/upload", formData);
    const uploadedImage = response.data[0];
    return uploadedImage; // Return full image metadata
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};

// Create a blog post and handle all fields
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPost = async (postData: UserBlogPostData) => {
  try {
    const reqData = { data: {...postData} }
    const response = await api.post("/blogs",reqData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};