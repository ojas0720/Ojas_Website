# Portfolio Customization Design Document

## Overview

This design document outlines the systematic customization of an existing React portfolio website to showcase Ojas Shinde's professional profile. The project involves updating personal information, projects, skills, and contact details while maintaining the existing modern, minimalist design aesthetic and technical architecture.

The portfolio uses a component-based React architecture with Framer Motion animations, Tailwind CSS styling, and EmailJS for contact functionality. The customization will preserve all existing functionality while replacing content to reflect Ojas Shinde's professional identity.

## Architecture

The portfolio follows a modern React single-page application (SPA) architecture:

### Frontend Architecture
- **Framework**: React 19 with Vite build tool
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions and interactions
- **Routing**: React Router DOM for navigation
- **State Management**: React hooks for local component state
- **Email Service**: EmailJS for contact form functionality

### Component Hierarchy
```
App
├── Header (Navigation)
├── Hero (Main introduction)
├── Projects (Portfolio showcase)
├── Skills (Technical expertise)
├── Education (Academic background)
├── Contact (Contact form and information)
└── Footer (Site footer)
```

### File Structure
```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── Education.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Avatar.jsx
│   ├── Loader.jsx
│   └── ResumeRedirect.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Components and Interfaces

### Header Component
**Purpose**: Navigation and site branding
**Updates Required**:
- Change initials from "NM" to "OS" (Ojas Shinde)
- Update navigation links if needed
- Maintain responsive mobile menu functionality

### Hero Component
**Purpose**: Primary introduction and call-to-action
**Updates Required**:
- Replace "NITHIN MANDA" with "OJAS SHINDE"
- Update professional tagline and description
- Replace social media links (GitHub, LinkedIn, LeetCode)
- Update resume file reference from "Nithin_resume.pdf" to "Ojas Shinde Resume.pdf"
- Update top bar display name from "~NITHIN MANDA" to "~OJAS SHINDE"

### Projects Component
**Purpose**: Showcase portfolio projects
**Updates Required**:
- Replace project array with Ojas Shinde's projects
- Update project titles, descriptions, and technologies
- Replace live demo links and GitHub repositories
- Update project highlights and achievements
- Maintain existing project selection and display functionality

### Skills Component
**Purpose**: Display technical expertise
**Updates Required**:
- Update skill categories based on Ojas Shinde's expertise
- Reorganize skills into Frontend, Backend, Database, and DevOps & Tools
- Maintain existing visual layout and animations
- Update the collaboration call-to-action if needed

### Education Component
**Purpose**: Display academic background
**Updates Required**:
- Replace educational information with Ojas Shinde's background
- Update institution names, degrees, and dates
- Include relevant academic achievements
- Add any certifications or additional qualifications

### Contact Component
**Purpose**: Contact form and information
**Updates Required**:
- Update email address in form handler and display
- Update phone number
- Replace social media links in contact section
- Update EmailJS template parameters
- Change recipient email in EmailJS configuration

## Data Models

### Personal Information Model
```javascript
const personalInfo = {
  name: "Ojas Shinde",
  initials: "OS",
  tagline: "[To be extracted from resume]",
  description: "[Professional summary from resume]",
  email: "[Email from resume]",
  phone: "[Phone from resume]",
  location: "[Location from resume]"
}
```

### Social Links Model
```javascript
const socialLinks = {
  github: "[GitHub profile URL]",
  linkedin: "[LinkedIn profile URL]",
  leetcode: "[LeetCode profile URL if applicable]",
  twitter: "[Twitter profile URL if applicable]"
}
```

### Project Model
```javascript
const project = {
  title: "string",
  description: "string",
  tech: ["array", "of", "technologies"],
  image: "string (optional)",
  liveLink: "string (optional)",
  githubLink: "string (optional)",
  highlights: ["array", "of", "key", "achievements"]
}
```

### Skill Category Model
```javascript
const skillCategory = {
  name: "string", // Frontend, Backend, Database, DevOps & Tools
  skills: ["array", "of", "skill", "names"]
}
```

### Education Model
```javascript
const education = {
  institution: "string",
  degree: "string",
  field: "string",
  graduationDate: "string",
  gpa: "string (optional)",
  honors: "string (optional)",
  relevantCoursework: ["array (optional)"]
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, I'll focus on the most valuable properties that provide unique validation:

**Property 1: Social media links consistency**
*For any* social media link displayed in the portfolio, the link should point to Ojas Shinde's correct social media profile URL
**Validates: Requirements 2.3, 6.4**

**Property 2: Project data completeness**
*For any* project displayed in the projects section, it should contain at minimum a title, description, and technologies array
**Validates: Requirements 3.2**

**Property 3: Project links validity**
*For any* project that has live demo or GitHub links, those links should be properly formatted URLs and displayed as clickable elements
**Validates: Requirements 3.3**

**Property 4: Skills categorization**
*For any* skill displayed in the skills section, it should appear in exactly one of the four defined categories (Frontend, Backend, Database, DevOps & Tools)
**Validates: Requirements 4.2, 4.4**

**Property 5: Education data structure**
*For any* education entry displayed, it should contain at minimum institution name, degree, and graduation date
**Validates: Requirements 5.2**

**Property 6: Conditional content display**
*For any* optional content (GPA, honors, certifications, work experience), if the data exists it should be displayed, and if it doesn't exist it should not cause errors
**Validates: Requirements 5.3, 5.4, 5.5**

**Property 7: Application functionality preservation**
*For any* core functionality (navigation, form submission, responsive design, animations), updating personal content should not break existing behavior
**Validates: Requirements 7.2, 7.5**

## Error Handling

### Content Loading Errors
- **Missing Resume Data**: If resume data cannot be extracted, display placeholder content with clear indicators
- **Broken Links**: Validate all external links and provide fallback behavior for broken URLs
- **Missing Images**: Provide default placeholder images for projects without screenshots

### Form Submission Errors
- **EmailJS Failures**: Display user-friendly error messages when email sending fails
- **Validation Errors**: Provide clear feedback for invalid form inputs
- **Network Issues**: Handle offline scenarios gracefully

### Build and Runtime Errors
- **Missing Dependencies**: Ensure all required packages are properly installed
- **Environment Variables**: Validate EmailJS configuration and provide clear error messages
- **Asset Loading**: Handle missing or corrupted asset files gracefully

## Testing Strategy

### Dual Testing Approach

The portfolio customization will use both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Testing Requirements:**
- Unit tests will verify specific examples and integration points
- Test specific content updates (name changes, contact info, etc.)
- Verify form submission functionality with mocked EmailJS
- Test responsive design breakpoints
- Validate navigation and routing behavior

**Property-Based Testing Requirements:**
- Use **React Testing Library** with **@fast-check/jest** for property-based testing
- Configure each property-based test to run a minimum of 100 iterations
- Each property-based test must be tagged with a comment referencing the design document property
- Tag format: **Feature: portfolio-customization, Property {number}: {property_text}**
- Each correctness property will be implemented by a single property-based test

**Testing Framework Selection:**
- **Unit Testing**: Jest with React Testing Library
- **Property-Based Testing**: @fast-check/jest for generating test data
- **E2E Testing**: Playwright for full user journey validation

### Test Categories

**Content Validation Tests:**
- Verify personal information appears correctly throughout the site
- Test that all links point to correct destinations
- Validate project data structure and display

**Functionality Tests:**
- Test contact form submission with various inputs
- Verify navigation and routing behavior
- Test responsive design across different screen sizes

**Integration Tests:**
- Test EmailJS integration with mocked service
- Verify build process completes successfully
- Test that all animations and interactions work after content updates

## Implementation Approach

### Phase 1: Content Extraction and Preparation
1. Extract personal information from Ojas Shinde's resume
2. Organize projects, skills, and education data
3. Prepare social media links and contact information
4. Update resume file reference

### Phase 2: Component Updates
1. Update Hero component with personal branding
2. Replace Projects component data
3. Update Skills component categories and items
4. Modify Contact component information
5. Update Header and Footer components

### Phase 3: Configuration Updates
1. Update EmailJS configuration
2. Update environment variables
3. Update page title and meta information
4. Test all external links and integrations

### Phase 4: Testing and Validation
1. Run comprehensive test suite
2. Validate all functionality works correctly
3. Test responsive design across devices
4. Verify email functionality
5. Perform final content review

## Dependencies and External Services

### Required Updates
- **EmailJS Configuration**: Update service ID, template ID, and recipient email
- **Resume File**: Replace "Nithin_resume.pdf" with "Ojas Shinde Resume.pdf"
- **Social Media URLs**: Update all social media profile links
- **Contact Information**: Update email and phone number throughout

### Environment Variables
```
VITE_SERVICE_ID=[EmailJS Service ID]
VITE_TEMPLATE_ID=[EmailJS Template ID]  
VITE_PUBLIC_KEY=[EmailJS Public Key]
```

### External Dependencies
- EmailJS for contact form functionality
- Social media platforms for profile links
- Resume PDF file hosting
- Project demo hosting (if applicable)

## Performance Considerations

### Optimization Strategies
- Maintain existing lazy loading for components
- Optimize images for projects if new ones are added
- Ensure bundle size remains minimal
- Preserve existing animation performance

### Monitoring
- Verify build time doesn't increase significantly
- Test loading performance after content updates
- Ensure responsive design performance is maintained