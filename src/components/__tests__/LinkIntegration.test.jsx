import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import Hero from '../Hero';
import { personalInfo, socialLinks } from '../../data/personalData';

/**
 * Link Integration Test Suite
 * 
 * This test suite validates that external links are properly integrated
 * into the actual components and render correctly.
 * 
 * Requirements: 2.3, 2.5
 */

describe('Link Integration in Components', () => {
    describe('Hero Component Links', () => {
        it('should render social media links correctly', () => {
            render(<Hero />);

            // Check GitHub link
            const githubLink = screen.getByRole('link', { name: /github/i });
            expect(githubLink).toHaveAttribute('href', socialLinks.github);
            expect(githubLink).toHaveAttribute('target', '_blank');
            expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

            // Check LinkedIn link
            const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
            expect(linkedinLink).toHaveAttribute('href', socialLinks.linkedin);
            expect(linkedinLink).toHaveAttribute('target', '_blank');

            // Check LeetCode link
            const leetcodeLink = screen.getByRole('link', { name: /leetcode/i });
            expect(leetcodeLink).toHaveAttribute('href', socialLinks.leetcode);
            expect(leetcodeLink).toHaveAttribute('target', '_blank');
        });

        it('should render resume link correctly', () => {
            render(<Hero />);

            const resumeLink = screen.getByRole('link', { name: /resume/i });
            expect(resumeLink).toHaveAttribute('href', personalInfo.resumeFile);
            expect(resumeLink).toHaveAttribute('target', '_blank');
            expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
        });

        it('should have proper link accessibility attributes', () => {
            render(<Hero />);

            const externalLinks = screen.getAllByRole('link').filter(link =>
                link.getAttribute('target') === '_blank'
            );

            externalLinks.forEach(link => {
                // All external links should have proper security attributes
                expect(link).toHaveAttribute('rel', 'noopener noreferrer');
            });
        });
    });

    describe('Contact Information Validation', () => {
        it('should have proper contact information format', () => {
            // Test contact information format without rendering Contact component
            // to avoid Jest configuration issues with import.meta

            // Check email format
            expect(personalInfo.email).toBeDefined();
            expect(personalInfo.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            expect(personalInfo.email.toLowerCase()).toMatch(/ojas|shinde/);

            // Check phone format
            expect(personalInfo.phone).toBeDefined();
            expect(personalInfo.phone).toMatch(/^\+?[\d\s-()]+$/);
        });
    });

    describe('Link Security and Best Practices', () => {
        it('should have proper security attributes for external links', () => {
            render(<Hero />);

            const allExternalLinks = screen.getAllByRole('link').filter(link => {
                const href = link.getAttribute('href');
                return href && (href.startsWith('http') || href.startsWith('https'));
            });

            allExternalLinks.forEach(link => {
                if (link.getAttribute('target') === '_blank') {
                    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
                }
            });
        });

        it('should have valid href attributes for all links', () => {
            render(<Hero />);

            const allLinks = screen.getAllByRole('link');

            allLinks.forEach(link => {
                const href = link.getAttribute('href');
                expect(href).toBeTruthy();
                expect(href).not.toBe('#');
                expect(href).not.toBe('');
            });
        });
    });

    describe('Social Media Link Validation', () => {
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

        it('should have proper URL formats for social media links', () => {
            expect(socialLinks.github).toMatch(/^https:\/\/github\.com\/[\w-]+\/?$/);
            expect(socialLinks.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\/in\/[\w-]+\/?$/);

            if (socialLinks.leetcode) {
                expect(socialLinks.leetcode).toMatch(/^https:\/\/leetcode\.com\/[\w-]+\/?$/);
            }

            if (socialLinks.twitter) {
                expect(socialLinks.twitter).toMatch(/^https:\/\/(x|twitter)\.com\/[\w-]+\/?$/);
            }
        });
    });

    describe('Resume File Validation', () => {
        it('should have correct resume file path and format', () => {
            expect(personalInfo.resumeFile).toBeDefined();
            expect(personalInfo.resumeFile).toBe('/Ojas Shinde Resume.pdf');
            expect(personalInfo.resumeFile).toMatch(/\.pdf$/i);
            expect(personalInfo.resumeFile).toContain('Ojas Shinde');
        });
    });
});