Component Library: Contribution & Style Guidelines
This document provides the official guidelines for using and contributing to the modular component library. Following these rules ensures our web pages remain consistent, accessible, and easy to maintain.
1. Accessibility Checklist (The Golden Rules)
Every component and page must adhere to these standards:
 * One <h1> Per Page: A page must have exactly one <h1>, which is the main title of the entire page. All section titles within the page must use <h2>.
 * Use Semantic HTML: Use meaningful tags like <section>, <nav>, <main>, <footer>, and <button>. Do not use <div> for everything.
 * All Images Must Have alt Text: Every <img> tag requires an alt attribute.
   * If the image is decorative, use alt="".
   * If the image conveys information (like a logo or diagram), describe it concisely (e.g., alt="Product Name Logo").
 * Interactive Elements Must Be Accessible:
   * Elements that trigger actions must be <button> tags.
   * Buttons that show/hide content must use aria-expanded="true/false" and aria-controls="id_of_content".
 * Ensure Good Color Contrast: All text must have sufficient color contrast against its background to be easily readable. Use the CSS variables provided, as they have been pre-checked for this.
2. Creating a New Component
When a new design requires a new component, follow these steps:
 * File Naming: Create a new HTML file in the /components/ folder. The name should be lowercase and hyphenated (e.g., pricing-table.html).
 * Structure: The entire component must be wrapped in a single <section> tag with a descriptive class name (e.g., <section class="pricing-section">).
 * Styling:
   * First, try to build the component using the existing utility classes (.container, .cta-button, etc.) and CSS variables.
   * If new styles are needed, add them to the shared style.css file in a clearly marked section (e.g., /* --- START: PRICING TABLE SECTION --- */).
3. Styling with CSS Variables
To maintain brand consistency, always use the predefined CSS variables for colors and spacing where possible.
 * Primary Color: var(--primary-color)
 * Text Color: var(--text-color)
 * Border Color: var(--border-color)
Example:
/* Good: Uses the system's defined color */
.new-component-title {
    color: var(--primary-color);
}

/* Bad: Hardcoded color that will not update with themes */
.new-component-title {
    color: #005A9C;
}

4. Team Workflow (Using GitHub)
To add or modify a component safely:
 * Create a Branch: Before making changes, create a new branch in GitHub (e.g., feature/add-pricing-table). This keeps the main library stable.
 * Add Your Files: Create your new component-name.html file in the /components/ folder. If you added CSS, modify the style.css file.
 * Update the Library: In index.html, add your new component's information to the components list in the JavaScript section.
 * Create a Pull Request: When you are finished, create a Pull Request on GitHub. This allows another team member to review your work for accessibility and consistency before it's merged into the main library.
