export const slugify = (text: string) =>
  text
    .replace(/[^a-z0-9]+/gi, "-")
    .toLowerCase()
    .replace(/(^-|-$)/g, "");
