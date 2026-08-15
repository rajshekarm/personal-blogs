import type {
  BlogBlock,
  BlogBlockType,
  BlogSection,
} from "../types/blogEditor";

export function createId() {
  return crypto.randomUUID();
}

export function createSection(): BlogSection {
  return {
    id: createId(),
    heading: "",
    subheading: "",
    blocks: [],
  };
}

export function createBlock(
  type: BlogBlockType,
): BlogBlock {
  const id = createId();

  switch (type) {
    case "paragraph":
      return {
        id,
        type,
        data: {
          text: "",
        },
      };

    case "image":
      return {
        id,
        type,
        data: {
          src: "",
          alt: "",
          caption: "",
          size: "large",
        },
      };

    case "code":
      return {
        id,
        type,
        data: {
          language: "python",
          code: "",
        },
      };

    case "quote":
      return {
        id,
        type,
        data: {
          text: "",
        },
      };

    case "callout":
      return {
        id,
        type,
        data: {
          title: "Important",
          text: "",
        },
      };

    case "tip":
      return {
        id,
        type,
        data: {
          title: "Tip",
          text: "",
        },
      };

    case "warning":
      return {
        id,
        type,
        data: {
          title: "Warning",
          text: "",
        },
      };

    case "comparison":
      return {
        id,
        type,
        data: {
          leftTitle: "Option A",
          leftText: "",
          rightTitle: "Option B",
          rightText: "",
        },
      };

    case "steps":
      return {
        id,
        type,
        data: {
          items: "",
        },
      };

    case "faq":
      return {
        id,
        type,
        data: {
          question: "",
          answer: "",
        },
      };

    case "divider":
      return {
        id,
        type,
        data: {},
      };
  }
}