/**
 * SunyMP3FLAC-Tagger Website JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Screenshot Gallery
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    const screenshotBtns = document.querySelectorAll('.screenshot-btn');

    screenshotBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));

            // Update active states
            screenshotItems.forEach(function(item, i) {
                item.classList.toggle('active', i === index);
            });

            screenshotBtns.forEach(function(b, i) {
                b.classList.toggle('active', i === index);
            });
        });
    });

    // Auto-rotate screenshots every 5 seconds
    let currentScreenshot = 0;
    const totalScreenshots = screenshotItems.length;

    if (totalScreenshots > 1) {
        setInterval(function() {
            currentScreenshot = (currentScreenshot + 1) % totalScreenshots;

            screenshotItems.forEach(function(item, i) {
                item.classList.toggle('active', i === currentScreenshot);
            });

            screenshotBtns.forEach(function(btn, i) {
                btn.classList.toggle('active', i === currentScreenshot);
            });
        }, 5000);
    }

    // OS Detection and Download Button Highlight
    function detectOS() {
        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();

        if (platform.includes('mac') || userAgent.includes('mac')) {
            return 'mac';
        } else if (platform.includes('win') || userAgent.includes('win')) {
            return 'windows';
        }
        return null;
    }

    const detectedOS = detectOS();
    const macBtn = document.getElementById('download-mac-btn');
    const winBtn = document.getElementById('download-win-btn');
    const heroMacBtn = document.getElementById('hero-mac-btn');
    const heroWinBtn = document.getElementById('hero-win-btn');

    if (detectedOS === 'mac') {
        if (macBtn) macBtn.classList.add('recommended');
        if (heroMacBtn) {
            heroMacBtn.classList.remove('btn-secondary');
            heroMacBtn.classList.add('btn-primary');
        }
        if (heroWinBtn) {
            heroWinBtn.classList.remove('btn-primary');
            heroWinBtn.classList.add('btn-secondary');
        }
    } else if (detectedOS === 'windows') {
        if (winBtn) winBtn.classList.add('recommended');
        if (heroWinBtn) {
            heroWinBtn.classList.remove('btn-secondary');
            heroWinBtn.classList.add('btn-primary');
        }
        if (heroMacBtn) {
            heroMacBtn.classList.remove('btn-primary');
            heroMacBtn.classList.add('btn-secondary');
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });

    // Download click tracking (optional - for analytics)
    document.querySelectorAll('.download-btn, .btn-primary, .btn-secondary').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const os = this.id.includes('mac') ? 'macOS' : 'Windows';
            console.log('Download clicked:', os);
            // Add your analytics tracking here if needed
        });
    });
});
