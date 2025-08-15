document.addEventListener('DOMContentLoaded', function() {
    // --- DATA SOURCE FOR ALL COMPONENTS ---
    const components = {
        'header': {
            title: 'Header',
            practices: `<ul><li>The logos are now inline SVGs, so they will always load correctly without external files.</li><li>The header is responsive and will hide the company logo on mobile to save space.</li></ul>`
        },
        'video-centered': {
            title: 'Video - Centered',
            practices: `<ul><li>Use an <strong>&lt;h2&gt;</strong> for the title unless this is the main hero section of the page, then use <strong>&lt;h1&gt;</strong>.</li><li>The transcript improves accessibility for users who are deaf or hard of hearing.</li></ul>`
        },
        'video-split-left': {
            title: 'Video - Split Left',
            practices: `<ul><li>Ideal for showcasing a feature and providing context next to it.</li><li>On mobile, the video stacks on top of the text content for a logical flow.</li></ul>`
        },
        'video-split-right': {
            title: 'Video - Split Right',
            practices: `<ul><li>Uses the exact same HTML as "Split Left" but with an added <strong>.reverse</strong> class on the &lt;section&gt; tag.</li></ul>`
        },
        'banner-full-width': {
            title: 'Banner - Full Width',
            practices: `<ul><li>Great for a primary call-to-action (CTA).</li></ul>`
        },
        'banner-fullscreen': {
            title: 'Banner - Full Screen',
            practices: `<ul><li>Use for a high-impact hero image. Keeps the same widescreen image on mobile.</li><li>The dark overlay (<strong>::before</strong> pseudo-element) ensures text is readable. Adjust its opacity (e.g., <strong>rgba(0,0,0,0.5)</strong>) as needed.</li></ul>`
        },
        'features-3-col': {
            title: 'Features - 3 Column',
            practices: `<ul><li>Clearly communicates key benefits at a glance.</li><li>Use simple, universally understood icons. SVG icons are recommended as they scale without losing quality.</li></ul>`
        },
        'team-bios': {
            title: 'Team Bios',
            practices: `<ul><li>Use high-quality, professional headshots for a consistent look.</li><li>Keep the bio text concise and engaging.</li></ul>`
        },
        'process-section': {
            title: 'Step-by-Step Process',
            practices: `<ul><li>Clearly and simply explain a workflow or process to the user.</li><li>This component stacks vertically on mobile for easy reading.</li></ul>`
        },
        'gallery-section': {
            title: 'Image Gallery',
            practices: `<ul><li>Ideal for showcasing product screenshots, portfolio items, or event photos.</li><li>Ensure all images have descriptive <strong>alt text</strong> for accessibility.</li></ul>`
        },
        'testimonial': {
            title: 'Testimonial',
            practices: `<ul><li>Builds social proof and trust. Use a real quote from a real customer if possible.</li><li>The <strong>&lt;blockquote&gt;</strong> and <strong>&lt;cite&gt;</strong> tags are semantically correct for this purpose.</li></ul>`
        },
        'faq': {
            title: 'FAQ Accordion',
            practices: `<ul><li>Saves space by hiding answers until they are needed.</li><li>The use of <strong>&lt;button&gt;</strong> and ARIA attributes (aria-expanded, aria-controls) is critical for accessibility.</li></ul>`
        },
        'footer': {
            title: 'Footer',
            practices: `<ul><li>Keep disclaimer text concise. Link to full policies like "Terms of Service" or "Privacy Policy".</li><li>The logo is a styled SVG, ensuring it always loads and looks correct.</li></ul>`
        },
        'paragraph': {
            title: 'Paragraph',
            practices: `<ul><li>For basic text content. Use as many paragraphs as needed.</li></ul>`
        }
    };

    let componentStyles = '';
    let headerHtml = '';
    let footerHtml = '';

    // Pre-fetch common resources
    Promise.all([
        fetch('src/css/components.css').then(res => res.text()),
        fetch('src/components/header.html').then(res => res.text()),
        fetch('src/components/footer.html').then(res => res.text())
    ]).then(([css, header, footer]) => {
        componentStyles = css;
        headerHtml = header;
        footerHtml = footer;
    }).catch(error => console.error("Error pre-fetching resources:", error));


    function initializeInteractiveElements(rootElement) {
        rootElement.querySelectorAll('.transcript-toggle').forEach(button => {
            button.addEventListener('click', function () {
                const contentId = this.getAttribute('aria-controls');
                const content = rootElement.querySelector('#' + contentId);
                if (content) {
                    const isHidden = content.hidden;
                    content.hidden = !isHidden;
                    this.setAttribute('aria-expanded', !isHidden);
                    this.textContent = isHidden ? 'Show Transcript' : 'Hide Transcript';
                }
            });
        });
        rootElement.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', function() {
                const contentId = this.getAttribute('aria-controls');
                const content = rootElement.querySelector('#' + contentId);
                if (content) {
                    const isHidden = content.hidden;
                    content.hidden = !isHidden;
                    this.setAttribute('aria-expanded', !isHidden);
                }
            });
        });
    }

    const links = document.querySelectorAll('.component-link');
    const viewers = document.querySelectorAll('.component-viewer');
    const welcomeMessage = document.getElementById('welcome-message');

    function generateComponentHTML(component, html) {
        const interactiveScript = `(${initializeInteractiveElements.toString()})(document.body)`;
        const iframeSrcDoc = `
            <html>
                <head><style>${componentStyles}</style></head>
                <body>${html}<script>${interactiveScript}<\/script></body>
            </html>`.replace(/"/g, '&quot;');

        return `
            <h2>${component.title}</h2>
            <h3>Best Practices:</h3>
            <div class="best-practices">${component.practices}</div>
            <h3>Preview:</h3>
            <div class="preview-container">
                <div class="preview-tabs">
                    <button class="preview-tab active" data-target="desktop">Desktop</button>
                    <button class="preview-tab" data-target="mobile">Mobile</button>
                </div>
                <div class="preview-content">
                    <div class="preview-pane active" id="desktop-preview">${html}</div>
                    <div class="preview-pane" id="mobile-preview">
                        <div class="mobile-preview-wrapper"><iframe src="about:blank" srcdoc="${iframeSrcDoc}"></iframe></div>
                    </div>
                </div>
            </div>
            <div class="component-details">
                <div class="details-tabs">
                    <button class="details-tab active" data-pane="html">HTML</button>
                </div>
                <div class="details-pane active" id="html-pane">
                    <div class="component-code">
                        <button class="copy-button" title="Copy code">Copy</button>
                        <pre><code>${html.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
                    </div>
                </div>
            </div>`;
    }

    function copyTextToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }, () => {
            button.textContent = 'Error';
        });
    }

    document.getElementById('copy-full-template').addEventListener('click', function(e) {
        const pageTemplateWithCSS = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <style>
${componentStyles}
    </style>
</head>
<body>
    ${headerHtml}

    <main>
        <!-- Add your components here -->

    </main>

    ${footerHtml}

    <script>
        (${initializeInteractiveElements.toString()})(document.body);
    <\/script>
</body>
</html>`;
        copyTextToClipboard(pageTemplateWithCSS, e.target);
    });

    links.forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);

            const viewer = document.getElementById(targetId);
            if (!viewer) {
                console.error(`No viewer found for id: ${targetId}`);
                return;
            }

            welcomeMessage.style.display = 'none';
            viewers.forEach(v => v.classList.remove('active'));
            viewer.classList.add('active');
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const componentData = components[targetId];
            if (!componentData) {
                console.error(`No component data found for id: ${targetId}`);
                return;
            }

            try {
                const response = await fetch(`src/components/${targetId}.html`);
                if (!response.ok) throw new Error('Component not found');
                const html = await response.text();

                viewer.innerHTML = generateComponentHTML(componentData, html);
                initializeInteractiveElements(viewer);
            } catch (error) {
                viewer.innerHTML = `<h2>Error loading component</h2><p>${error.message}</p>`;
            }
        });
    });

    document.querySelector('.library-content').addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-button')) {
            const pre = e.target.nextElementSibling;
            const code = pre.querySelector('code').innerText;
            copyTextToClipboard(code, e.target);
        }

        if (e.target.classList.contains('preview-tab')) {
            const parentContainer = e.target.closest('.preview-container');
            parentContainer.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            parentContainer.querySelectorAll('.preview-pane').forEach(p => p.classList.remove('active'));
            const targetPaneId = e.target.dataset.target + '-preview';
            parentContainer.querySelector('#' + targetPaneId).classList.add('active');
        }
        if (e.target.classList.contains('details-tab')) {
            const parentContainer = e.target.closest('.component-details');
            parentContainer.querySelectorAll('.details-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            parentContainer.querySelectorAll('.details-pane').forEach(p => p.classList.remove('active'));
            const targetPaneId = e.target.dataset.pane + '-pane';
            parentContainer.querySelector('#' + targetPaneId).classList.add('active');
        }
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle-switch');
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.setAttribute('data-theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    });
});
