/** Build a stable Unsplash URL with consistent optimization params. */
export function unsplashImage(photoId: string, width: number): string {
  return `https://images.unsplash.com/${photoId}?w=${width}&q=80&auto=format&fit=crop`;
}
