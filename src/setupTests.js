import '@testing-library/jest-dom';

// Mock IntersectionObserver for Framer Motion useInView hook
global.IntersectionObserver = class IntersectionObserver {
    constructor() { }
    disconnect() { }
    observe() { }
    unobserve() { }
};

// Mock TextEncoder and TextDecoder for React Router DOM
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;