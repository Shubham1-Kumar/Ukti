// useCategory.ts
import { useEffect, useState } from "react";
import axios from "axios";

type Category = {
  id: string;
  name: string;
  tags: string[];
  description?: string;
};

export const useGetAllCategores = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const cached = localStorage.getItem("categories");

    if (cached) {
      setCategories(JSON.parse(cached));
      setLoading(false);
    } else {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8787/app/v1/category",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data.categories || [];
          // ✅ Save to localStorage
          localStorage.setItem("categories", JSON.stringify(data));

          setCategories(data);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCategories();
    }
  }, [token]); // include token as dependency just in case

  // 🧹 Clear localStorage on tab/browser close
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("categories");
    };
    window.addEventListener("unload", handleUnload);
    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);

  return { categories, loading };
};
