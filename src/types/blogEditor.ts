export type BlogBlockType =
  | "paragraph"
  | "image"
  | "code"
  | "quote"
  | "callout"
  | "tip"
  | "warning"
  | "comparison"
  | "steps"
  | "faq"
  | "divider";

export type BlogBlock = {
  id: string;
  type: BlogBlockType;
  data: Record<string, any>;
};

export type BlogSection = {
  id: string;
  heading?: string;
  subheading?: string;
  blocks: BlogBlock[];
};

export type BlogDraft = {
  id: string;

  title: string;
  subtitle?: string;

  excerpt?: string;

  coverImage?: string;

  author: string;

  tags: string[];

  sections: BlogSection[];
};