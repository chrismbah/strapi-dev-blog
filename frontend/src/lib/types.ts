// export Interface for Image Data
export interface ImageData {
    url: string;
  }
  
  // export Interface for Author Data
  export interface Author {
    id: number; // Assuming each author has a unique ID
    name: string;
    email: string;
    avatar: ImageData; // Assuming you have an avatar image
  }
  
  // export Interface for Category Data
  export interface Category {
    documentId: string; // Assuming each category has a unique ID
    name: string;
    description: string; // Optional description
  }
  
  // export Interface for Blog Post Data
  export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    description: string;
    content: string; // This could be rich markdown text
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    cover: ImageData; // Assuming this is the structure of your featured image
    author: Author; // The author of the blog post
    categories: Category[]; // An array of categories associated with the post
    documentId: string;
  }
  
  // Example response structure when fetching posts
  export interface BlogPostResponse {
    data: BlogPost[];
  }
  
  // Example response structure when fetching a single post
  export interface SingleBlogPostResponse {
    data: BlogPost; // The single blog post object
  }
  