import { render, screen } from '@testing-library/react';
import { fc } from '@fast-check/jest';
import Skills from '../Skills';
import { skills } from '../../data/personalData';

// **Feature: portfolio-customization, Property 4: Skills categorization**
// **Validates: Requirements 4.2, 4.4**
describe('Skills Component - Skills Categorization', () => {
    test('Property 4: Skills categorization - any skill should appear in exactly one of the four defined categories', () => {
        fc.assert(
            fc.property(fc.constantFrom(...Object.keys(skills)), (categoryKey) => {
                const { unmount } = render(<Skills />);

                // Get all skill categories displayed
                const frontendSection = screen.getByText('Frontend');
                const backendSection = screen.getByText('Backend');
                const databaseSection = screen.getByText('Database');
                const devopsSection = screen.getByText('DevOps & Tools');

                // Verify all four categories are present
                expect(frontendSection).toBeInTheDocument();
                expect(backendSection).toBeInTheDocument();
                expect(databaseSection).toBeInTheDocument();
                expect(devopsSection).toBeInTheDocument();

                // Get all skills from the selected category
                const categorySkills = skills[categoryKey];

                // Verify each skill in the category appears exactly once on the page
                categorySkills.forEach(skill => {
                    const skillElements = screen.getAllByText(skill);
                    expect(skillElements).toHaveLength(1);
                });

                // Verify that skills from this category don't appear in other categories
                const allSkillsFlat = Object.values(skills).flat();
                const otherSkills = allSkillsFlat.filter(skill => !categorySkills.includes(skill));

                categorySkills.forEach(skill => {
                    // Each skill should appear exactly once (not duplicated across categories)
                    const occurrences = allSkillsFlat.filter(s => s === skill).length;
                    expect(occurrences).toBe(1);
                });

                unmount();
            }),
            { numRuns: 100 }
        );
    });

    test('Property 4 (Extended): All skills data structure validation', () => {
        fc.assert(
            fc.property(fc.constant(skills), (skillsData) => {
                // Verify skills object has exactly four categories
                const categories = Object.keys(skillsData);
                expect(categories).toHaveLength(4);
                expect(categories).toContain('frontend');
                expect(categories).toContain('backend');
                expect(categories).toContain('database');
                expect(categories).toContain('devopsAndTools');

                // Verify each category contains an array of strings
                categories.forEach(category => {
                    expect(Array.isArray(skillsData[category])).toBe(true);
                    expect(skillsData[category].length).toBeGreaterThan(0);

                    skillsData[category].forEach(skill => {
                        expect(typeof skill).toBe('string');
                        expect(skill.trim()).toBe(skill); // No leading/trailing whitespace
                        expect(skill.length).toBeGreaterThan(0); // Not empty
                    });
                });

                // Verify no duplicate skills across all categories
                const allSkills = Object.values(skillsData).flat();
                const uniqueSkills = [...new Set(allSkills)];
                expect(allSkills).toHaveLength(uniqueSkills.length);
            }),
            { numRuns: 100 }
        );
    });
});

describe('Skills Component - Unit Tests', () => {
    describe('Component Structure', () => {
        test('should render main heading', () => {
            render(<Skills />);

            expect(screen.getByRole('heading', { name: /technical skills/i })).toBeInTheDocument();
        });

        test('should render section with correct id', () => {
            render(<Skills />);

            const section = document.getElementById('skills');
            expect(section).toBeInTheDocument();
            expect(section.tagName.toLowerCase()).toBe('section');
        });

        test('should render expertise label', () => {
            render(<Skills />);

            expect(screen.getByText('EXPERTISE')).toBeInTheDocument();
        });
    });

    describe('Skills Categories Display', () => {
        test('should display all four skill categories', () => {
            render(<Skills />);

            expect(screen.getByText('Frontend')).toBeInTheDocument();
            expect(screen.getByText('Backend')).toBeInTheDocument();
            expect(screen.getByText('Database')).toBeInTheDocument();
            expect(screen.getByText('DevOps & Tools')).toBeInTheDocument();
        });

        test('should display all frontend skills', () => {
            render(<Skills />);

            skills.frontend.forEach(skill => {
                expect(screen.getByText(skill)).toBeInTheDocument();
            });
        });

        test('should display all backend skills', () => {
            render(<Skills />);

            skills.backend.forEach(skill => {
                expect(screen.getByText(skill)).toBeInTheDocument();
            });
        });

        test('should display all database skills', () => {
            render(<Skills />);

            skills.database.forEach(skill => {
                expect(screen.getByText(skill)).toBeInTheDocument();
            });
        });

        test('should display all devops and tools skills', () => {
            render(<Skills />);

            skills.devopsAndTools.forEach(skill => {
                expect(screen.getByText(skill)).toBeInTheDocument();
            });
        });
    });

    describe('Skills Organization', () => {
        test('should organize skills into correct categories', () => {
            render(<Skills />);

            // Verify that React.js appears under Frontend
            const frontendSection = screen.getByText('Frontend').closest('div');
            expect(frontendSection).toHaveTextContent('React.js');

            // Verify that Node.js appears under Backend
            const backendSection = screen.getByText('Backend').closest('div');
            expect(backendSection).toHaveTextContent('Node.js');

            // Verify that MySQL appears under Database
            const databaseSection = screen.getByText('Database').closest('div');
            expect(databaseSection).toHaveTextContent('MySQL');

            // Verify that Git appears under DevOps & Tools
            const devopsSection = screen.getByText('DevOps & Tools').closest('div');
            expect(devopsSection).toHaveTextContent('Git');
        });

        test('should not duplicate skills across categories', () => {
            render(<Skills />);

            // Get all skill text elements
            const allSkillElements = screen.getAllByText(/React\.js|Node\.js|MySQL|Git/);

            // Each skill should appear exactly once
            const skillCounts = {};
            allSkillElements.forEach(element => {
                const skillText = element.textContent;
                skillCounts[skillText] = (skillCounts[skillText] || 0) + 1;
            });

            Object.values(skillCounts).forEach(count => {
                expect(count).toBe(1);
            });
        });
    });

    describe('Call to Action Section', () => {
        test('should display collaboration call-to-action', () => {
            render(<Skills />);

            expect(screen.getByText(/ready to collaborate/i)).toBeInTheDocument();
            expect(screen.getByText(/let's discuss how my skills can help your project/i)).toBeInTheDocument();
        });

        test('should have contact link in call-to-action', () => {
            render(<Skills />);

            const contactLink = screen.getByRole('link', { name: /get in touch/i });
            expect(contactLink).toHaveAttribute('href', '#contact');
        });
    });

    describe('Skills Data Validation', () => {
        test('should have non-empty skill arrays for all categories', () => {
            expect(skills.frontend.length).toBeGreaterThan(0);
            expect(skills.backend.length).toBeGreaterThan(0);
            expect(skills.database.length).toBeGreaterThan(0);
            expect(skills.devopsAndTools.length).toBeGreaterThan(0);
        });

        test('should have valid skill names (non-empty strings)', () => {
            Object.values(skills).flat().forEach(skill => {
                expect(typeof skill).toBe('string');
                expect(skill.trim().length).toBeGreaterThan(0);
            });
        });

        test('should have expected key technologies', () => {
            // Verify some key technologies are present
            const allSkills = Object.values(skills).flat();

            expect(allSkills).toContain('React.js');
            expect(allSkills).toContain('JavaScript');
            expect(allSkills).toContain('Node.js');
            expect(allSkills).toContain('Git');
        });
    });
});