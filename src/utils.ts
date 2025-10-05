/**
 * Utility function to get the correct asset path based on deployment environment
 * @param path - The relative asset path
 * @returns The correct path for the current deployment environment
 */
export function getAssetPath(path: string): string {
  // Check if we're on GitHub Pages subdirectory
  const isGitHubPages =
    window.location.hostname === 'imatson9119.github.io' &&
    window.location.pathname.startsWith('/personal-website');

  if (isGitHubPages) {
    return `/personal-website/${path}`;
  }

  return path;
}
