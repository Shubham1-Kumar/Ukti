import { useState } from "react";
import { createArticleSchemaType } from "../../../common/schemas/articleSchema";
import { getAllArticleWithFilterSchemaType } from "../../../common/schemas/articleSchema";
import axios from "axios";
import qs from "qs";



interface UseArticleReturn {
  GetAllArticlesForAUser: (
    query: getAllArticleWithFilterSchemaType
  ) => Promise<any>;
  createArticleAsDraft: (data: createArticleSchemaType) => Promise<void>;
  likeArticle: (articleId: string) => Promise<void>;
  unlikeArticle: (articleId: string) => Promise<void>;
  commentOnArticle : (aritcleId:string, content:string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useArticle(): UseArticleReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");

  const createArticleAsDraft = async (payload: createArticleSchemaType) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("http://127.0.0.1:8787/app/v1/articles", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setSuccess(true);
    } catch (err: any) {
      console.error("Failed to create article:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const GetAllArticlesForAUser = async (
    query: getAllArticleWithFilterSchemaType
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const queryInput = qs.stringify(query, { addQueryPrefix: true });

    try {
      const response = await axios.get(
        `http://127.0.0.1:8787/app/v1/articles${queryInput}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      localStorage.setItem("Articles", JSON.stringify(response.data));
      return response.data;
    } catch (err: any) {
      console.error("Failed to get the articles:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const likeArticle = async (articleId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8787/app/v1/articles/${articleId}/like`,
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      console.log("Liked article:", response.data);
    } catch (error: any) {
      console.error("Error liking article:", error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const unlikeArticle = async (articleId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8787/app/v1/articles/${articleId}/like`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      console.log("Unliked article:", response.data);
    } catch (error: any) {
      console.error("Error unliking article:", error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const commentOnArticle = async (articleId: string, content: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8787/app/v1/articles/${articleId}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to post comment");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    GetAllArticlesForAUser,
    createArticleAsDraft,
    likeArticle,
    unlikeArticle,
    commentOnArticle,
    loading,
    error,
    success,
  };
}


export const hydarateTheAllField = () => {
  const { GetAllArticlesForAUser } = useArticle();
  const fetchAllArticles = async () => {
    try {
      const query = {
        query: {
          page: 1,
          limit: 10,
          sortBy: "createdAt" as "createdAt",
          order: "desc" as "desc",
        },
      };
      const result = await GetAllArticlesForAUser(query);
    } catch (error) {
      console.error("Error loading articles on page load:", error);
    } finally {
    }
  };

  fetchAllArticles();
};


