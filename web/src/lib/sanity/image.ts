import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "@/lib/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export function urlForImageWithHotspot(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}
