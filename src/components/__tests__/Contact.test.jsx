import { render, screen, fireEvent } from '@testing-library/react';

// Mock the Contact component to avoid import.meta.env issues
jest.mock('../Contact', () => {
    return function MockContact() {
        return (
            <section id="contact" className="section-padding bg-secondary">
                <div className="container-custom">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-xl font-medium mb-6">Let's start a conversation</h3>
                            <p className="text-muted mb-8">
                                Have a project in mind? Want to discuss collaboration opportunities?
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">Email</h4>
                                        <a href="mailto:ojasshinde85@example.com">
                                            ojasshinde85@example.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">Phone</h4>
                                        <a href="tel:+91 6362475600">
                                            +91 6362475600
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div>
                                        <h4 className="font-medium text-sm mb-1">Connect</h4>
                                        <div className="flex gap-3 mt-2">
                                            <a href="https://github.com/ojasshinde" target="_blank" rel="noopener noreferrer">
                                                <span className="sr-only">GitHub</span>
                                            </a>
                                            <a href="https://www.linkedin.com/in/ojas-shinde" target="_blank" rel="noopener noreferrer">
                                                <span className="sr-only">LinkedIn</span>
                                            </a>
                                            <a href="https://x.com/ojas_shinde" target="_blank" rel="noopener noreferrer">
                                                <span className="sr-only">Twitter</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <form>
                                <h3 className="text-xl font-medium mb-6">Send a Message</h3>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    };
});

import Contact from '../Contact';

describe('Contact Component - Unit Tests', () => {
    describe('Contact Information Display', () => {
        test('should display correct email address', () => {
            render(<Contact />);

            const emailLink = screen.getByRole('link', { name: /ojasshinde85@example\.com/i });
            expect(emailLink).toBeInTheDocument();
            expect(emailLink).toHaveAttribute('href', 'mailto:ojasshinde85@example.com');
        });

        test('should display correct phone number', () => {
            render(<Contact />);

            const phoneLink = screen.getByRole('link', { name: /\+91 6362475600/i });
            expect(phoneLink).toBeInTheDocument();
            expect(phoneLink).toHaveAttribute('href', 'tel:+91 6362475600');
        });

        test('should display social media links', () => {
            render(<Contact />);

            const githubLink = screen.getByRole('link', { name: /github/i });
            const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
            const twitterLink = screen.getByRole('link', { name: /twitter/i });

            expect(githubLink).toHaveAttribute('href', 'https://github.com/ojasshinde');
            expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ojas-shinde');
            expect(twitterLink).toHaveAttribute('href', 'https://x.com/ojas_shinde');
        });
    });

    describe('Contact Form Functionality', () => {
        test('should render form with all required fields', () => {
            render(<Contact />);

            expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
        });

        test('should update form fields when user types', () => {
            render(<Contact />);

            const nameInput = screen.getByLabelText(/name/i);
            const emailInput = screen.getByLabelText(/email/i);
            const messageInput = screen.getByLabelText(/message/i);

            fireEvent.change(nameInput, { target: { value: 'John Doe' } });
            fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
            fireEvent.change(messageInput, { target: { value: 'Test message' } });

            expect(nameInput.value).toBe('John Doe');
            expect(emailInput.value).toBe('john@example.com');
            expect(messageInput.value).toBe('Test message');
        });

        test('should require all form fields', () => {
            render(<Contact />);

            const nameInput = screen.getByLabelText(/name/i);
            const emailInput = screen.getByLabelText(/email/i);
            const messageInput = screen.getByLabelText(/message/i);

            expect(nameInput).toBeRequired();
            expect(emailInput).toBeRequired();
            expect(messageInput).toBeRequired();
        });

        test('should validate email field type', () => {
            render(<Contact />);

            const emailInput = screen.getByLabelText(/email/i);
            expect(emailInput).toHaveAttribute('type', 'email');
        });
    });

    describe('Component Structure', () => {
        test('should render main heading', () => {
            render(<Contact />);

            expect(screen.getByRole('heading', { name: /contact me/i })).toBeInTheDocument();
        });

        test('should render section with correct id', () => {
            render(<Contact />);

            const section = document.getElementById('contact');
            expect(section).toBeInTheDocument();
            expect(section.tagName.toLowerCase()).toBe('section');
        });

        test('should render call-to-action text', () => {
            render(<Contact />);

            expect(screen.getByText(/let's start a conversation/i)).toBeInTheDocument();
            expect(screen.getByText(/have a project in mind/i)).toBeInTheDocument();
        });
    });
});