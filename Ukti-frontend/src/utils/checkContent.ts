export const isContentDeltaEmpty = (delta: any): boolean => {
  if (!delta || !Array.isArray(delta.ops)) return true;
  return delta.ops.every((op:any) => {
    if (typeof op.insert === "string") {
      // remove whitespace and zero-width space
      const text = op.insert.replace(/\s|\u200B/g, "");
      return text === "";
    }
    // If user only inserts image/video and you want to treat that as empty, return true
    // Example: { insert: { image: 'url' } } — change this if media is acceptable
    if (typeof op.insert === 'object' && (op.insert.image || op.insert.video)) {
        return false; // this means "not empty"
    }
    return false;
  });
};

export const isHTMLContentEmpty = (html: string): boolean => {
  if (!html) return true;

  // Remove invisible tags (like <br>, <p>, etc.) and spaces
  const stripped = html
    .replace(/<(br|hr|p|div|ul|li)[^>]*>/gi, "") // remove tags
    .replace(/<\/?(p|div|ul|li)[^>]*>/gi, "")
    .replace(/&nbsp;/gi, "") // remove HTML spaces
    .replace(/\s|\u200B/g, "") // remove all whitespace + zero-width space
    .trim();

  return stripped === "";
};
