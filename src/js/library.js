document.addEventListener('DOMContentLoaded', function() {
    const components = [
        'header',
        'footer',
        'banner-cta',
        'banner-image',
        'features-3-column',
        'team-bios',
        'process-guide',
        'testimonial-quote',
        'faq-accordion',
        'video-player-centered',
        'image-gallery'
    ];

    const libraryContainer = document.getElementById('component-library');
    const pageTemplateUrl = 'template.html';

    // Add "Copy Full Page Template" button
    const templateButton = document.createElement('button');
    templateButton.textContent = 'Copy Full Page Template';
    templateButton.classList.add('copy-button', 'template-copy-button');
    templateButton.addEventListener('click', () => copyUrlToClipboard(pageTemplateUrl, templateButton));
    libraryContainer.before(templateButton);


    components.forEach(componentName => {
        const url = `src/components/${componentName}.html`;
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const section = document.createElement('section');
                section.classList.add('component-display');

                const title = document.createElement('h2');
                title.textContent = componentName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                section.appendChild(title);

                const preview = document.createElement('div');
                preview.classList.add('component-preview');
                preview.innerHTML = html;
                section.appendChild(preview);

                const codeContainer = document.createElement('div');
                codeContainer.classList.add('code-container');

                const pre = document.createElement('pre');
                const code = document.createElement('code');
                code.textContent = html;
                pre.appendChild(code);
                codeContainer.appendChild(pre);

                const copyButton = document.createElement('button');
                copyButton.textContent = 'Copy HTML';
                copyButton.classList.add('copy-button');
                copyButton.addEventListener('click', () => copyToClipboard(html, copyButton));
                codeContainer.appendChild(copyButton);

                section.appendChild(codeContainer);

                libraryContainer.appendChild(section);

                // Re-initialize any scripts for the newly added components
                initializeComponentScripts();
            });
    });

    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    }

    function copyUrlToClipboard(url, button) {
        fetch(url)
            .then(response => response.text())
            .then(text => copyToClipboard(text, button));
    }

    function initializeComponentScripts() {
        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(button => {
            if (button.dataset.initialized) return;
            button.dataset.initialized = true;
            button.addEventListener('click', () => {
                const answerId = button.getAttribute('aria-controls');
                const answer = document.getElementById(answerId);
                const isExpanded = button.getAttribute('aria-expanded') === 'true';

                button.setAttribute('aria-expanded', !isExpanded);
                answer.hidden = isExpanded;
            });
        });

        // Video Player Transcript
        const transcriptToggles = document.querySelectorAll('.transcript-toggle');
        transcriptToggles.forEach(button => {
            if (button.dataset.initialized) return;
            button.dataset.initialized = true;
            button.addEventListener('click', () => {
                const transcriptId = button.getAttribute('aria-controls');
                const transcript = document.getElementById(transcriptId);
                const isExpanded = button.getAttribute('aria-expanded') === 'true';

                button.setAttribute('aria-expanded', !isExpanded);
                transcript.hidden = isExpanded;
                button.textContent = isExpanded ? 'Show Transcript' : 'Hide Transcript';
            });
        });

        // Image Gallery
        const galleries = document.querySelectorAll('.image-gallery-section');
        galleries.forEach(gallery => {
            if (gallery.dataset.initialized) return;
            gallery.dataset.initialized = true;

            const thumbnails = gallery.querySelectorAll('.thumbnail');
            const mainImage = gallery.querySelector('.main-image img');

            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', () => {
                    thumbnails.forEach(t => t.classList.remove('active'));
                    thumbnail.classList.add('active');
                    mainImage.src = thumbnail.dataset.src;
                    mainImage.alt = thumbnail.alt;
                });
            });
        });
    }
});
