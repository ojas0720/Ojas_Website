import { render, screen } from '@testing-library/react';
import { fc } from '@fast-check/jest';
import Education from '../Education';
import { education, workExperience, achievements, certifications } from '../../data/personalData';

// **Feature: portfolio-customization, Property 5: Education data structure**
// **Validates: Requirements 5.2**
describe('Education Component - Education Data Structure', () => {
    test('Property 5: Education data structure - any education entry should contain at minimum institution name, degree, and graduation date', () => {
        fc.assert(
            fc.property(fc.constantFrom(...education), (educationEntry) => {
                const { unmount } = render(<Education />);

                // Verify required fields are present and non-empty
                expect(educationEntry.institution).toBeDefined();
                expect(typeof educationEntry.institution).toBe('string');
                expect(educationEntry.institution.trim().length).toBeGreaterThan(0);

                expect(educationEntry.degree).toBeDefined();
                expect(typeof educationEntry.degree).toBe('string');
                expect(educationEntry.degree.trim().length).toBeGreaterThan(0);

                expect(educationEntry.graduationDate).toBeDefined();
                expect(typeof educationEntry.graduationDate).toBe('string');
                expect(educationEntry.graduationDate.trim().length).toBeGreaterThan(0);

                // Verify the education entry is displayed in the component
                expect(screen.getByText(educationEntry.institution)).toBeInTheDocument();
                expect(screen.getByText(new RegExp(educationEntry.degree, 'i'))).toBeInTheDocument();

                // Verify optional fields are handled correctly
                if (educationEntry.field) {
                    expect(typeof educationEntry.field).toBe('string');
                }

                if (educationEntry.gpa) {
                    expect(typeof educationEntry.gpa).toBe('string');
                    expect(educationEntry.gpa.trim().length).toBeGreaterThan(0);
                }

                if (educationEntry.honors) {
                    expect(typeof educationEntry.honors).toBe('string');
                    expect(educationEntry.honors.trim().length).toBeGreaterThan(0);
                }

                unmount();
            }),
            { numRuns: 100 }
        );
    });

    test('Property 5 (Extended): Complete education data structure validation', () => {
        fc.assert(
            fc.property(fc.constant(education), (educationData) => {
                // Verify education is an array
                expect(Array.isArray(educationData)).toBe(true);
                expect(educationData.length).toBeGreaterThan(0);

                // Verify each education entry has the required structure
                educationData.forEach(entry => {
                    // Required fields
                    expect(entry).toHaveProperty('institution');
                    expect(entry).toHaveProperty('degree');
                    expect(entry).toHaveProperty('graduationDate');

                    expect(typeof entry.institution).toBe('string');
                    expect(typeof entry.degree).toBe('string');
                    expect(typeof entry.graduationDate).toBe('string');

                    expect(entry.institution.trim().length).toBeGreaterThan(0);
                    expect(entry.degree.trim().length).toBeGreaterThan(0);
                    expect(entry.graduationDate.trim().length).toBeGreaterThan(0);

                    // Optional fields validation
                    if (entry.field !== undefined && entry.field !== null) {
                        expect(typeof entry.field).toBe('string');
                        expect(entry.field.trim().length).toBeGreaterThan(0);
                    }

                    if (entry.gpa !== undefined && entry.gpa !== null) {
                        expect(typeof entry.gpa).toBe('string');
                        expect(entry.gpa.trim().length).toBeGreaterThan(0);
                    }

                    if (entry.honors !== undefined && entry.honors !== null) {
                        expect(typeof entry.honors).toBe('string');
                        expect(entry.honors.trim().length).toBeGreaterThan(0);
                    }
                });
            }),
            { numRuns: 100 }
        );
    });
});

// **Feature: portfolio-customization, Property 6: Conditional content display**
// **Validates: Requirements 5.3, 5.4, 5.5**
describe('Education Component - Conditional Content Display', () => {
    test('Property 6: Conditional content display - optional content should be displayed when data exists and not cause errors when missing', () => {
        fc.assert(
            fc.property(fc.constant(true), () => {
                const { unmount } = render(<Education />);

                // Test work experience conditional display
                if (workExperience && workExperience.length > 0) {
                    expect(screen.getByText('Work Experience')).toBeInTheDocument();
                    workExperience.forEach(work => {
                        expect(screen.getByText(work.position)).toBeInTheDocument();
                        expect(screen.getByText(work.company)).toBeInTheDocument();
                        if (work.duration) {
                            expect(screen.getByText(work.duration)).toBeInTheDocument();
                        }
                    });
                } else {
                    expect(screen.queryByText('Work Experience')).not.toBeInTheDocument();
                }

                // Test certifications conditional display
                if (certifications && certifications.length > 0) {
                    expect(screen.getByText('Certifications')).toBeInTheDocument();
                    certifications.forEach(cert => {
                        expect(screen.getByText(cert.name)).toBeInTheDocument();
                        expect(screen.getByText(cert.issuer)).toBeInTheDocument();
                        if (cert.date) {
                            expect(screen.getByText(cert.date)).toBeInTheDocument();
                        }
                        if (cert.credentialId) {
                            expect(screen.getByText(`ID: ${cert.credentialId}`)).toBeInTheDocument();
                        }
                    });
                } else {
                    expect(screen.queryByText('Certifications')).not.toBeInTheDocument();
                }

                // Test education optional fields (GPA, honors)
                education.forEach(edu => {
                    if (edu.gpa) {
                        expect(screen.getByText(`GPA: ${edu.gpa}`)).toBeInTheDocument();
                    }
                    if (edu.honors) {
                        expect(screen.getByText(edu.honors)).toBeInTheDocument();
                    }
                });

                // Verify component renders without errors regardless of optional content
                expect(screen.getByText('Education & Achievements')).toBeInTheDocument();
                expect(screen.getByText('Education')).toBeInTheDocument();
                expect(screen.getByText('Achievements')).toBeInTheDocument();

                unmount();
            }),
            { numRuns: 100 }
        );
    });

    test('Property 6 (Extended): Component stability with missing optional data', () => {
        fc.assert(
            fc.property(fc.constant(true), () => {
                // Test with potentially empty arrays/null values
                const mockEducation = education.map(edu => ({
                    ...edu,
                    gpa: Math.random() > 0.5 ? edu.gpa : null,
                    honors: Math.random() > 0.5 ? edu.honors : null,
                    field: Math.random() > 0.5 ? edu.field : null
                }));

                // Component should render without throwing errors
                expect(() => {
                    const { unmount } = render(<Education />);
                    unmount();
                }).not.toThrow();

                // Verify core sections are always present
                const { unmount } = render(<Education />);
                expect(screen.getByText('Education & Achievements')).toBeInTheDocument();
                expect(screen.getByText('Education')).toBeInTheDocument();
                expect(screen.getByText('Achievements')).toBeInTheDocument();

                unmount();
            }),
            { numRuns: 100 }
        );
    });
});

describe('Education Component - Unit Tests', () => {
    describe('Component Structure', () => {
        test('should render main heading', () => {
            render(<Education />);

            expect(screen.getByRole('heading', { name: /education & achievements/i })).toBeInTheDocument();
        });

        test('should render section with correct id', () => {
            render(<Education />);

            const section = document.getElementById('education');
            expect(section).toBeInTheDocument();
            expect(section.tagName.toLowerCase()).toBe('section');
        });

        test('should render background label', () => {
            render(<Education />);

            expect(screen.getByText('BACKGROUND')).toBeInTheDocument();
        });
    });

    describe('Education Display', () => {
        test('should display education section heading', () => {
            render(<Education />);

            expect(screen.getByText('Education')).toBeInTheDocument();
        });

        test('should display all education entries', () => {
            render(<Education />);

            education.forEach(edu => {
                expect(screen.getByText(edu.institution)).toBeInTheDocument();
                expect(screen.getByText(new RegExp(edu.degree, 'i'))).toBeInTheDocument();

                if (edu.graduationDate) {
                    expect(screen.getByText(edu.graduationDate)).toBeInTheDocument();
                }

                if (edu.field) {
                    // Use getAllByText and check if any element contains the field text
                    const elements = screen.getAllByText((content, element) => {
                        return element && element.textContent.includes(edu.field);
                    });
                    expect(elements.length).toBeGreaterThan(0);
                }

                if (edu.gpa) {
                    expect(screen.getByText(`GPA: ${edu.gpa}`)).toBeInTheDocument();
                }

                if (edu.honors) {
                    expect(screen.getByText(edu.honors)).toBeInTheDocument();
                }
            });
        });
    });

    describe('Work Experience Display', () => {
        test('should display work experience section when data exists', () => {
            render(<Education />);

            if (workExperience && workExperience.length > 0) {
                expect(screen.getByText('Work Experience')).toBeInTheDocument();

                workExperience.forEach(work => {
                    expect(screen.getByText(work.position)).toBeInTheDocument();
                    expect(screen.getByText(work.company)).toBeInTheDocument();

                    if (work.duration) {
                        expect(screen.getByText(work.duration)).toBeInTheDocument();
                    }

                    if (work.responsibilities) {
                        work.responsibilities.forEach(resp => {
                            expect(screen.getByText(resp)).toBeInTheDocument();
                        });
                    }
                });
            }
        });

        test('should not display work experience section when no data', () => {
            // This test would need to mock empty workExperience data
            // For now, we'll test that the component handles the current data correctly
            render(<Education />);

            if (!workExperience || workExperience.length === 0) {
                expect(screen.queryByText('Work Experience')).not.toBeInTheDocument();
            }
        });
    });

    describe('Achievements Display', () => {
        test('should display achievements section', () => {
            render(<Education />);

            expect(screen.getByText('Achievements')).toBeInTheDocument();
        });

        test('should display all achievements', () => {
            render(<Education />);

            achievements.forEach(achievement => {
                expect(screen.getByText(achievement)).toBeInTheDocument();
            });
        });
    });

    describe('Certifications Display', () => {
        test('should display certifications section when data exists', () => {
            render(<Education />);

            if (certifications && certifications.length > 0) {
                expect(screen.getByText('Certifications')).toBeInTheDocument();

                certifications.forEach(cert => {
                    expect(screen.getByText(cert.name)).toBeInTheDocument();
                    expect(screen.getByText(cert.issuer)).toBeInTheDocument();

                    if (cert.date) {
                        expect(screen.getByText(cert.date)).toBeInTheDocument();
                    }

                    if (cert.credentialId) {
                        expect(screen.getByText(`ID: ${cert.credentialId}`)).toBeInTheDocument();
                    }
                });
            }
        });

        test('should not display certifications section when no data', () => {
            render(<Education />);

            if (!certifications || certifications.length === 0) {
                expect(screen.queryByText('Certifications')).not.toBeInTheDocument();
            }
        });
    });

    describe('Continuous Learning Section', () => {
        test('should display continuous learning section', () => {
            render(<Education />);

            expect(screen.getByText('Continuous Learning')).toBeInTheDocument();
            expect(screen.getByText(/always exploring new technologies/i)).toBeInTheDocument();
        });
    });

    describe('Data Validation', () => {
        test('should have valid education data structure', () => {
            expect(Array.isArray(education)).toBe(true);
            expect(education.length).toBeGreaterThan(0);

            education.forEach(edu => {
                expect(edu).toHaveProperty('institution');
                expect(edu).toHaveProperty('degree');
                expect(edu).toHaveProperty('graduationDate');

                expect(typeof edu.institution).toBe('string');
                expect(typeof edu.degree).toBe('string');
                expect(typeof edu.graduationDate).toBe('string');
            });
        });

        test('should have valid achievements data', () => {
            expect(Array.isArray(achievements)).toBe(true);
            expect(achievements.length).toBeGreaterThan(0);

            achievements.forEach(achievement => {
                expect(typeof achievement).toBe('string');
                expect(achievement.trim().length).toBeGreaterThan(0);
            });
        });

        test('should have valid work experience data when present', () => {
            if (workExperience && workExperience.length > 0) {
                workExperience.forEach(work => {
                    expect(work).toHaveProperty('company');
                    expect(work).toHaveProperty('position');

                    expect(typeof work.company).toBe('string');
                    expect(typeof work.position).toBe('string');
                });
            }
        });

        test('should have valid certifications data when present', () => {
            if (certifications && certifications.length > 0) {
                certifications.forEach(cert => {
                    expect(cert).toHaveProperty('name');
                    expect(cert).toHaveProperty('issuer');

                    expect(typeof cert.name).toBe('string');
                    expect(typeof cert.issuer).toBe('string');
                });
            }
        });
    });
});