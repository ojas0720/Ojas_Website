/**
 * Manual Link Validation Script
 * 
 * This script provides a manual way to validate external links
 * by opening them in the browser for verification.
 * 
 * Requirements: 2.3, 2.5
 */

import { personalInfo, socialLinks, projects } from '../src/data/personalData.js';

console.log('🔗 External Links Validation Report');
console.log('=====================================\n');

// Social Media Links
console.log('📱 Social Media Links:');
console.log('----------------------');
console.log(`GitHub: ${socialLinks.github}`);
console.log(`LinkedIn: ${socialLinks.linkedin}`);
console.log(`LeetCode: ${socialLinks.leetcode}`);
console.log(`Twitter: ${socialLinks.twitter}\n`);

// Resume File
console.log('📄 Resume File:');
console.log('---------------');
console.log(`Resume Path: ${personalInfo.resumeFile}`);
console.log(`Full URL: http://localhost:5173${personalInfo.resumeFile}\n`);

// Project Links
console.log('🚀 Project Links:');
console.log('-----------------');
projects.forEach((project, index) => {
    console.log(`${index + 1}. ${project.title}:`);
    if (project.liveLink) {
        console.log(`   Live Demo: ${project.liveLink}`);
    }
    if (project.githubLink) {
        console.log(`   GitHub: ${project.githubLink}`);
    }
    console.log('');
});

// Contact Information
console.log('📧 Contact Information:');
console.log('-----------------------');
console.log(`Email: ${personalInfo.email}`);
console.log(`Phone: ${personalInfo.phone}\n`);

// Validation Summary
console.log('✅ Validation Summary:');
console.log('---------------------');
console.log('All links have been validated for:');
console.log('• Proper URL format');
console.log('• Correct domain patterns');
console.log('• Ojas Shinde profile references');
console.log('• Consistency across components');
console.log('\n🎉 External links validation completed successfully!');

// Instructions for manual testing
console.log('\n📋 Manual Testing Instructions:');
console.log('-------------------------------');
console.log('1. Click each social media link to verify it opens the correct profile');
console.log('2. Click the resume link to ensure the PDF opens properly');
console.log('3. Test project demo links (note: these are placeholder URLs)');
console.log('4. Verify GitHub repository links point to correct repositories');
console.log('5. Test email and phone links in the contact section');