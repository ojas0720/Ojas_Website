import { render, screen, fireEvent } from '@testing-library/react';
import Projects from '../Projects';
import { projects } from '../../data/personalData';

// **Feature: portfolio-customization, Property 2: Project data completeness**
// **Validates: Requirements 3.2**
describe('Projects Component - Data Completeness', () => {
    test('Property 2: Project data completeness - all projects should have required fields', () => {
        // Run this test multiple times to simulate property-based testing behavior
        for (let i = 0; i < 100; i++) {
            // Test that each project in the projects array has the required fields
            projects.forEach((project, index) => {
                // Verify project has title
                expect(project.title).toBeDefined();
                expect(typeof project.title).toBe('string');
                expect(project.title.length).toBeGreaterThan(0);

                // Verify project has description
                expect(project.description).toBeDefined();
                expect(typeof project.description).toBe('string');
                expect(project.description.length).toBeGreaterThan(0);

                // Verify project has technologies array
                expect(project.tech).toBeDefined();
                expect(Array.isArray(project.tech)).toBe(true);
                expect(project.tech.length).toBeGreaterThan(0);

                // Verify all technologies are strings
                project.tech.forEach(tech => {
                    expect(typeof tech).toBe('string');
                    expect(tech.length).toBeGreaterThan(0);
                });

                // Verify project has highlights array
                expect(project.highlights).toBeDefined();
                expect(Array.isArray(project.highlights)).toBe(true);
                expect(project.highlights.length).toBeGreaterThan(0);

                // Verify all highlights are strings
                project.highlights.forEach(highlight => {
                    expect(typeof highlight).toBe('string');
                    expect(highlight.length).toBeGreaterThan(0);
                });
            });
        }
    });
});

// **Feature: portfolio-customization, Property 3: Project links validity**
// **Validates: Requirements 3.3**
describe('Projects Component - Links Validity', () => {
    test('Property 3: Project links validity - all project links should be properly formatted URLs', () => {
        // Run this test multiple times to simulate property-based testing behavior
        for (let i = 0; i < 100; i++) {
            projects.forEach((project, index) => {
                // Test liveLink if it exists
                if (project.liveLink) {
                    expect(typeof project.liveLink).toBe('string');
                    expect(project.liveLink.length).toBeGreaterThan(0);

                    // Verify it's a valid URL format
                    expect(() => new URL(project.liveLink)).not.toThrow();

                    // Verify it starts with http or https
                    expect(project.liveLink).toMatch(/^https?:\/\//);
                }

                // Test githubLink if it exists
                if (project.githubLink) {
                    expect(typeof project.githubLink).toBe('string');
                    expect(project.githubLink.length).toBeGreaterThan(0);

                    // Verify it's a valid URL format
                    expect(() => new URL(project.githubLink)).not.toThrow();

                    // Verify it starts with http or https
                    expect(project.githubLink).toMatch(/^https?:\/\//);

                    // Verify it's a GitHub URL
                    expect(project.githubLink).toMatch(/github\.com/);
                }

                // At least one link should be present for each project
                expect(project.liveLink || project.githubLink).toBeTruthy();
            });
        }
    });
});

describe('Projects Component - Unit Tests', () => {
    describe('Component Structure', () => {
        test('should render main heading', () => {
            render(<Projects />);

            expect(screen.getByRole('heading', { name: /featured projects/i })).toBeInTheDocument();
        });

        test('should render section with correct id', () => {
            render(<Projects />);

            const section = document.getElementById('projects');
            expect(section).toBeInTheDocument();
            expect(section.tagName.toLowerCase()).toBe('section');
        });

        test('should render portfolio label', () => {
            render(<Projects />);

            expect(screen.getByText('PORTFOLIO')).toBeInTheDocument();
        });
    });

    describe('Project Display', () => {
        test('should display first project by default', () => {
            render(<Projects />);

            const firstProject = projects[0];
            const titleElements = screen.getAllByText(firstProject.title);
            expect(titleElements.length).toBeGreaterThan(0);
            expect(screen.getByText(firstProject.description)).toBeInTheDocument();
        });

        test('should display project technologies', () => {
            render(<Projects />);

            const firstProject = projects[0];
            firstProject.tech.forEach(tech => {
                expect(screen.getByText(tech)).toBeInTheDocument();
            });
        });

        test('should display project highlights', () => {
            render(<Projects />);

            const firstProject = projects[0];
            firstProject.highlights.forEach(highlight => {
                expect(screen.getByText(highlight)).toBeInTheDocument();
            });
        });

        test('should display key highlights section', () => {
            render(<Projects />);

            expect(screen.getByText('KEY HIGHLIGHTS')).toBeInTheDocument();
        });

        test('should display technologies section', () => {
            render(<Projects />);

            expect(screen.getByText('TECHNOLOGIES')).toBeInTheDocument();
        });
    });

    describe('Project Selection', () => {
        test('should allow switching between projects', () => {
            render(<Projects />);

            // Find project selectors (desktop version)
            const projectSelectors = screen.getAllByText(projects[1].title.split(" - ")[0]);

            if (projectSelectors.length > 0) {
                fireEvent.click(projectSelectors[0]);

                // Should now display the second project
                const titleElements = screen.getAllByText(projects[1].title);
                expect(titleElements.length).toBeGreaterThan(0);
                expect(screen.getByText(projects[1].description)).toBeInTheDocument();
            }
        });

        test('should display all project titles in selector', () => {
            render(<Projects />);

            projects.forEach(project => {
                const projectTitle = project.title.split(" - ")[0];
                const titleElements = screen.getAllByText(projectTitle);
                expect(titleElements.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Project Links', () => {
        test('should render live demo links when available', () => {
            render(<Projects />);

            const firstProject = projects[0];
            if (firstProject.liveLink) {
                const liveLink = screen.getByRole('link', { name: /view live/i });
                expect(liveLink).toHaveAttribute('href', firstProject.liveLink);
                expect(liveLink).toHaveAttribute('target', '_blank');
                expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
            }
        });

        test('should render GitHub links when available', () => {
            render(<Projects />);

            const firstProject = projects[0];
            if (firstProject.githubLink) {
                const githubLink = screen.getByRole('link', { name: /view code/i });
                expect(githubLink).toHaveAttribute('href', firstProject.githubLink);
                expect(githubLink).toHaveAttribute('target', '_blank');
                expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
            }
        });
    });

    describe('Responsive Design', () => {
        test('should display project count indicator on mobile', () => {
            render(<Projects />);

            // Look for the project count indicator (e.g., "1/3")
            const countIndicator = screen.getByText(`1/${projects.length}`);
            expect(countIndicator).toBeInTheDocument();
        });

        test('should display select project label on mobile', () => {
            render(<Projects />);

            expect(screen.getByText('SELECT PROJECT')).toBeInTheDocument();
        });
    });
});