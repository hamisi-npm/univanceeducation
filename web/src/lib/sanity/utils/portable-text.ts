type PortableTextSpan = {
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  children?: PortableTextSpan[];
};

/** Extracts plain-text paragraphs from Sanity Portable Text blocks. */
export function blocksToParagraphs(
  blocks: PortableTextBlock[] | null | undefined,
): string[] {
  if (!blocks?.length) {
    return [];
  }

  return blocks
    .filter((block) => block._type === "block")
    .map((block) =>
      (block.children ?? [])
        .map((child) => child.text ?? "")
        .join(""),
    )
    .filter(Boolean);
}

/** Flattens Portable Text blocks into a single plain-text string. */
export function blocksToPlainText(
  blocks: PortableTextBlock[] | null | undefined,
): string {
  return blocksToParagraphs(blocks).join("\n\n");
}
