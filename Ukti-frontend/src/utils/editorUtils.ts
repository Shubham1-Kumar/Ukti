import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export function convertDeltaToHtml(delta: any): string {
  if (!delta || !delta.ops) return "<p>No content available</p>";

  const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
  return converter.convert();
}
