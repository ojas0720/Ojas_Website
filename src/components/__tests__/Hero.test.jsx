import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

// **Feature: portfolio-customization, Property 1: Social media links consistency**
// **Validates: Requirements 2.3, 6.4**
describe('Hero Component - Social Media Links', () => {
    test('Property 1: Social media links consistency - all social media links should point to Ojas Shinde profiles', () => {
        // Run this test multiple times to simulate property-based testing behavior
        for (let i = 0; i < 100; i++) {
            const { unmount } = render(<Hero />);

            // Get all social media links
            const githubLink = screen.getByRole('link', { name: /github/i });
            const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
            const leetcodeLink = screen.getByRole('link', { name: /leetcode/i });

            // Verify GitHub link points to Ojas Shinde's profile
            expect(githubLink).toHaveAttribute('href', 'https://github.com/ojasshinde');

            // Verify LinkedIn link points to Ojas Shinde's profile
            expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ojas-shinde');

            // Verify LeetCode link points to Ojas Shinde's profile
            expect(leetcodeLink).toHaveAttribute('href', 'https://leetcode.com/ojasshinde');

            // Verify all links open in new tab
            expect(githubLink).toHaveAttribute('target', '_blank');
            expect(linkedinLink).toHaveAttribute('target', '_blank');
            expect(leetcodeLink).toHaveAttribute('target', '_blank');

            // Verify all links have proper security attributes
            expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
            expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
            expect(leetcodeLink).toHaveAttribute('rel', 'noopener noreferrer');

            unmount();
        }
    });
});

describe('Hero Component - Unit Tests', () => {
    describe('Personal Information Display', () => {
        test('should display correct name in hero section', () => {
            render(<Hero />);

            expect(screen.getByText('OJAS SHINDE')).toBeInTheDocument();
        });

        test('should display correct name in top bar', () => {
            render(<Hero />);

            expect(screen.getByText('~OJAS SHINDE')).toBeInTheDocument();
        });

        test('should display professional tagline', () => {
            render(<Hero />);

            expect(screen.getByText('Full Stack Developer & Software Engineer')).toBeInTheDocument();
        });

        test('should display professional description', () => {
            render(<Hero />);

            expect(screen.getByText(/passionate software engineer with expertise/i)).toBeInTheDocument();
        });
    });

    describe('Resume and Navigation', () => {
        test('should have correct resume link', () => {
            render(<Hero />);

            const resumeLink = screen.getByRole('link', { name: /resume/i });
            expect(resumeLink).toHaveAttribute('href', '/Ojas Shinde Resume.pdf');
            expect(resumeLink).toHaveAttribute('target', '_blank');
            expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
        });

        test('should have view projects button', () => {
            render(<Hero />);

            const projectsLink = screen.getByRole('link', { name: /view projects/i });
            expect(projectsLink).toHaveAttribute('href', '#projects');
        });
    });

    describe('Time Display', () => {
        test('should display current time and date', () => {
            render(<Hero />);

            // Check that time display elements exist (format will vary based on current time)
            const timeElements = screen.getAllByText(/\d{2}:\d{2}/);
            expect(timeElements.length).toBeGreaterThan(0);

            const dateElements = screen.getAllByText(/\d{2}\/\d{2}\/\d{4}/);
            expect(dateElements.length).toBeGreaterThan(0);
        });
    });

    describe('Component Structure', () => {
        test('should render section with correct id', () => {
            render(<Hero />);

            const section = document.getElementById('home');
            expect(section).toBeInTheDocument();
            expect(section.tagName.toLowerCase()).toBe('section');
        });

        test('should render greeting text', () => {
            render(<Hero />);

            expect(screen.getByText("HELLO, I'M")).toBeInTheDocument();
        });

        test('should render portfolio label', () => {
            render(<Hero />);

            expect(screen.getByText('PORTFOLIO')).toBeInTheDocument();
        });
    });

    describe('Social Media Links', () => {
        test('should render all social media links with correct text', () => {
            render(<Hero />);

            expect(screen.getByText('GITHUB')).toBeInTheDocument();
            expect(screen.getByText('LINKEDIN')).toBeInTheDocument();
            expect(screen.getByText('LEETCODE')).toBeInTheDocument();
        });

        test('should have proper accessibility attributes for social links', () => {
            render(<Hero />);

            const githubLink = screen.getByRole('link', { name: /github/i });
            const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
            const leetcodeLink = screen.getByRole('link', { name: /leetcode/i });

            // All should have proper security attributes
            [githubLink, linkedinLink, leetcodeLink].forEach(link => {
                expect(link).toHaveAttribute('target', '_blank');
                expect(link).toHaveAttribute('rel', 'noopener noreferrer');
            });
        });
    });
});