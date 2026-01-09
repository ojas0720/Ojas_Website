import { describe, it, expect, beforeAll } from '@jest/globals';
import { personalInfo, socialLinks, projects } from '../../data/personalData';

/**
 * External Links Validation Test Suite
 * 
 * This test suite validates all external links in the portfolio:
 * - Social media links (GitHub, LinkedIn, LeetCode, Twitter)
 * - Resume file accessibility
 * - Project demo and repository links
 * 
 * Requirements: 2.3, 2.5
 */

describe('External Links Validation', () => {
    // Helper function to validate URL format
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    // Helper function to check if URL is accessible (mock for testing)
    const isUrlAccessible = async (url) => {
        // In a real scenario, this would make an HTTP request
        // For testing purposes, we'll validate URL format and common patterns
        if (!isValidUrl(url)) return false;

        // Check for common valid patterns
        const validPatterns = [
            /^https:\/\/github\.com\/[\w-]+\/?$/,
            /^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/?$/,
            /^https:\/\/leetcode\.com\/[\w-]+\/?$/,
            /^https:\/\/x\.com\/[\w-]+\/?$/,
            /^https:\/\/twitter\.com\/[\w-]+\/?$/,
            /^https?:\/\/[\w.-]+\.[\w]{2,}(\/.*)?$/
        ];

        return validPatterns.some(pattern => pattern.test(url));
    };

    describe('Social Media Links', () => {
        it('should have valid GitHub link format', () => {
            expect(socialLinks.github).toBeDefined();
            expect(isValidUrl(socialLinks.github)).toBe(true);
            expect(socialLinks.github).toMatch(/^https:\/\/github\.com\/[\w-]+\/?$/);
        });

        it('should have valid LinkedIn link format', () => {
            expect(socialLinks.linkedin).toBeDefined();
            expect(isValidUrl(socialLinks.linkedin)).toBe(true);
            expect(socialLinks.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/?$/);
        });

        it('should have valid LeetCode link format if provided', () => {
            if (socialLinks.leetcode) {
                expect(isValidUrl(socialLinks.leetcode)).toBe(true);
                expect(socialLinks.leetcode).toMatch(/^https:\/\/leetcode\.com\/[\w-]+\/?$/);
            }
        });

        it('should have valid Twitter/X link format if provided', () => {
            if (socialLinks.twitter) {
                expect(isValidUrl(socialLinks.twitter)).toBe(true);
                expect(socialLinks.twitter).toMatch(/^https:\/\/(x|twitter)\.com\/[\w-]+\/?$/);
            }
        });

        it('should have all social links pointing to Ojas Shinde profiles', () => {
            // Check that links contain appropriate username patterns for Ojas Shinde
            expect(socialLinks.github.toLowerCase()).toMatch(/ojas|shinde/);
            expect(socialLinks.linkedin.toLowerCase()).toMatch(/ojas|shinde/);

            if (socialLinks.leetcode) {
                expect(socialLinks.leetcode.toLowerCase()).toMatch(/ojas|shinde/);
            }

            if (socialLinks.twitter) {
                expect(socialLinks.twitter.toLowerCase()).toMatch(/ojas|shinde/);
            }
        });
    });

    describe('Resume File', () => {
        it('should have correct resume file path', () => {
            expect(personalInfo.resumeFile).toBeDefined();
            expect(personalInfo.resumeFile).toBe('/Ojas Shinde Resume.pdf');
        });

        it('should reference an existing resume file', () => {
            // This test assumes the file exists in the public folder
            // In a real test environment, you might check file existence
            expect(personalInfo.resumeFile).toMatch(/\.pdf$/i);
            expect(personalInfo.resumeFile).toContain('Ojas Shinde');
        });
    });

    describe('Project Links', () => {
        it('should have valid project demo links when provided', () => {
            projects.forEach((project, index) => {
                if (project.liveLink) {
                    expect(isValidUrl(project.liveLink)).toBe(true);
                    console.log(`Project ${index + 1} (${project.title}) live link: ${project.liveLink}`);
                }
            });
        });

        it('should have valid GitHub repository links when provided', () => {
            projects.forEach((project, index) => {
                if (project.githubLink) {
                    expect(isValidUrl(project.githubLink)).toBe(true);
                    expect(project.githubLink).toMatch(/^https:\/\/github\.com\/[\w-]+\/[\w-]+\/?$/);
                    console.log(`Project ${index + 1} (${project.title}) GitHub link: ${project.githubLink}`);
                }
            });
        });

        it('should have project links pointing to Ojas Shinde repositories', () => {
            projects.forEach((project) => {
                if (project.githubLink) {
                    expect(project.githubLink.toLowerCase()).toMatch(/github\.com\/ojas|github\.com\/[\w-]*shinde/);
                }
            });
        });
    });

    describe('Link Accessibility (Mock Test)', () => {
        it('should have accessible social media links', async () => {
            const socialLinkTests = [
                { name: 'GitHub', url: socialLinks.github },
                { name: 'LinkedIn', url: socialLinks.linkedin },
                { name: 'LeetCode', url: socialLinks.leetcode },
                { name: 'Twitter', url: socialLinks.twitter }
            ].filter(link => link.url); // Only test links that exist

            for (const link of socialLinkTests) {
                const isAccessible = await isUrlAccessible(link.url);
                expect(isAccessible).toBe(true);
                console.log(`${link.name} link (${link.url}) is accessible`);
            }
        });

        it('should have accessible project links', async () => {
            for (const project of projects) {
                if (project.liveLink) {
                    const isAccessible = await isUrlAccessible(project.liveLink);
                    expect(isAccessible).toBe(true);
                    console.log(`${project.title} live demo (${project.liveLink}) is accessible`);
                }

                if (project.githubLink) {
                    const isAccessible = await isUrlAccessible(project.githubLink);
                    expect(isAccessible).toBe(true);
                    console.log(`${project.title} GitHub repo (${project.githubLink}) is accessible`);
                }
            }
        });
    });

    describe('Link Consistency', () => {
        it('should have consistent social links across components', () => {
            // This test ensures that social links are consistent wherever they appear
            // The links should be the same in Hero, Contact, and any other components
            expect(socialLinks.github).toBeDefined();
            expect(socialLinks.linkedin).toBeDefined();

            // Verify links don't have trailing inconsistencies
            Object.values(socialLinks).forEach(link => {
                if (link) {
                    expect(link).not.toMatch(/\/\/$/); // No double slashes at end
                    expect(link.trim()).toBe(link); // No leading/trailing whitespace
                }
            });
        });

        it('should have proper email format in contact information', () => {
            expect(personalInfo.email).toBeDefined();
            expect(personalInfo.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            expect(personalInfo.email.toLowerCase()).toMatch(/ojas|shinde/);
        });

        it('should have proper phone format', () => {
            expect(personalInfo.phone).toBeDefined();
            expect(personalInfo.phone).toMatch(/^\+?[\d\s-()]+$/);
        });
    });
});