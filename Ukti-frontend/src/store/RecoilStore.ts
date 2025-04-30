// recoil/atoms.ts
import { atom, atomFamily } from "recoil";

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default: false,
});

// a sample userState data example:
const user = {
  id: "e7809aaf-7f57-46e4-b7a9-55b3a87c861c",
  email: "shivamsing@gmail.com",
  name: "Shivam Signh",
  avatar: null,
  bio: null,
  role: "USER",
  createdAt: "2025-04-08T19:38:38.996Z",
  isDeleted: false,
  isVerified: false,
  updatedAt: "2025-04-08T19:38:38.996Z",
};

export const userState = atom<any>({
  key: "userState",
  default: null,
});

// export const enum ArticleStatus {
//   DRAFT,
//   PUBLISHED,
//   ARCHIVED,
// }

export type DraftArticleType = {
  title: string;
  content: any;
  contentDelta: any;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  CoverImage: string;
};

export const draftArticleAtom = atom<DraftArticleType>({
  key: "draftArticleAtom",
  default: {
    title: "",
    content: "",
    description: "",
    contentDelta: "",
    status: "DRAFT",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: "",
    tags: [],
    CoverImage:""
  },
});

export type Article = {
  id: string;
  title: string;
  content: any; // from Quill (delta) or HTML or JSON
  contentDelta?: any;
  description: string;
  authorId: string;
  categoryId?: string;
  likes: number;
  views: number;
  noOfComments: number;
  coverImage: string;
  readingTime: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;

  // Relations (optional on frontend)
  tags?: string[]; // or full tag objects
  bookmarks?: string[]; // or user ids
  comments?: any[];
  notes?: any[];
  articleLikes?: string[]; // user ids who liked
};

// recoil/articleAtoms.ts

export const articleAtomFamily = atomFamily<Article, string>({
  key: "articleAtomFamily",
  default: {
    id: "",
    title: "",
    content: {},
    description: "",
    authorId: "",
    categoryId: undefined,
    likes: 0,
    views: 0,
    noOfComments: 0,
    coverImage:"",
    readingTime: 0,
    status: "DRAFT",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: null,

    tags: [],
    bookmarks: [],
    comments: [],
    notes: [],
    articleLikes: [],
  },
});

export const coverImageAsFileAtom = atom<File | null>({
  key: 'coverImageAsFileAtom',
  default: null,
});

export const coverImagePreviewAtom = atom<string | null>({
  key: 'coverImagePreviewAtom',
  default: null,
});