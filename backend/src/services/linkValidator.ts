/**
 * Safe External Profile Link Validator
 * Complies with PRD: Validates user-submitted coding links without scraping or impersonating external platforms.
 */

export interface ValidationResult {
  platform: 'github' | 'leetcode' | 'codeforces' | 'hackerrank' | 'portfolio' | 'linkedin' | 'unknown';
  isValid: boolean;
  cleanUrl?: string;
  error?: string;
}

const ALLOWED_PATTERNS: Record<string, RegExp> = {
  github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+(\/)?$/,
  leetcode: /^https:\/\/(www\.)?leetcode\.com\/(u\/)?[a-zA-Z0-9_-]+(\/)?$/,
  codeforces: /^https:\/\/(www\.)?codeforces\.com\/profile\/[a-zA-Z0-9_-]+(\/)?$/,
  hackerrank: /^https:\/\/(www\.)?hackerrank\.com\/profile\/[a-zA-Z0-9_-]+(\/)?$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-%]+(\/)?$/,
};

export function validateExternalLink(urlStr: string): ValidationResult {
  try {
    const parsed = new URL(urlStr);
    
    // Must be HTTPS
    if (parsed.protocol !== 'https:') {
      return { platform: 'unknown', isValid: false, error: 'Only secure HTTPS links are allowed.' };
    }

    const hostname = parsed.hostname.toLowerCase();

    for (const [platform, regex] of Object.entries(ALLOWED_PATTERNS)) {
      if (hostname.includes(platform)) {
        if (regex.test(urlStr.trim())) {
          return { platform: platform as any, isValid: true, cleanUrl: urlStr.trim() };
        } else {
          return {
            platform: platform as any,
            isValid: false,
            error: `Invalid URL format for ${platform}. Please check the profile path.`
          };
        }
      }
    }

    // Generic portfolio / blog
    return {
      platform: 'portfolio',
      isValid: true,
      cleanUrl: urlStr.trim()
    };
  } catch {
    return { platform: 'unknown', isValid: false, error: 'Invalid URL string provided.' };
  }
}
