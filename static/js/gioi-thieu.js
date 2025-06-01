document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    const pageLoader = document.createElement('div');
    pageLoader.className = 'page-loader';
    pageLoader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <h3 class="text-xl font-bold">Đang tải...</h3>
            <p class="text-sm opacity-80">Chuẩn bị trải nghiệm tuyệt vời</p>
        </div>
    `;
    document.body.appendChild(pageLoader);

    // Hide loader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(pageLoader);
                initScrollAnimations();
                initCounterAnimations();
            }, 500);
        }, 1000);
    });

    // Scroll Animation System
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, parseInt(delay));
                }
            });
        }, observerOptions);

        // Observe all animation elements
        const animationElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up');
        animationElements.forEach(el => observer.observe(el));

        // Achievement progress bars
        const progressBars = document.querySelectorAll('.achievement-progress');
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = '100%';
                }
            });
        }, observerOptions);

        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    // Counter Animation
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Interactive value cards for mobile
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // Add hover effects for team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konami.join(',')) {
            showEasterEgg();
            konamiCode = [];
        }
    });

    function showEasterEgg() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <div class="bg-white p-8 rounded-2xl text-center max-w-md mx-4">
                    <div class="text-6xl mb-4">🎉</div>
                    <h3 class="text-2xl font-bold mb-4">Bạn đã tìm ra Easter Egg!</h3>
                    <p class="text-gray-600 mb-6">Chúc mừng! Bạn vừa mở khóa một thông điệp bí mật từ team Thurnix.</p>
                    <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
                        <p class="text-sm text-blue-800 font-semibold">"Passion for SEO drives us to excellence every day!" - Thurnix Team</p>
                    </div>
                    <button onclick="this.closest('.fixed').remove()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Awesome! 🚀
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(message);
    }

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add loading state for CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && !this.href.startsWith('tel:')) {
                e.preventDefault();
                this.style.opacity = '0.7';
                this.innerHTML = `
                    <div class="loader-spinner" style="width: 20px; height: 20px; margin-right: 8px;"></div>
                    Đang chuyển hướng...
                `;
                setTimeout(() => {
                    window.location.href = this.href;
                }, 1000);
            }
        });
    });

    // Add typing effect for hero headline
    const heroHeadline = document.querySelector('.hero-section h1');
    if (heroHeadline) {
        const text = heroHeadline.innerHTML;
        heroHeadline.innerHTML = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroHeadline.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }

    // Add mouse trail effect
    let mouseTrail = [];
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Keep only recent trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
        
        // Create trail elements
        if (mouseTrail.length > 1) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                pointer-events: none;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%);
                border-radius: 50%;
                left: ${e.clientX - 2}px;
                top: ${e.clientY - 2}px;
                z-index: 9999;
                animation: trailFade 0.5s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 500);
        }
    });

    // Add trail fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes trailFade {
            0% { opacity: 0.6; transform: scale(1); }
            100% { opacity: 0; transform: scale(0); }
        }
    `;
    document.head.appendChild(style);

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    console.log(`
    🚀 Thurnix About Page Loaded Successfully!
    
    ████████╗██╗  ██╗██╗   ██╗██████╗ ███╗   ██╗██╗██╗  ██╗
    ╚══██╔══╝██║  ██║██║   ██║██╔══██╗████╗  ██║██║╚██╗██╔╝
       ██║   ███████║██║   ██║██████╔╝██╔██╗ ██║██║ ╚███╔╝ 
       ██║   ██╔══██║██║   ██║██╔══██╗██║╚██╗██║██║ ██╔██╗ 
       ██║   ██║  ██║╚██████╔╝██║  ██║██║ ╚████║██║██╔╝ ██╗
       ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝
    
    🌟 SEO Agency - Made with ❤️ in Vietnam
    📧 Contact: seo@thurnix.com
    📞 Hotline: 0925 604 604
    `);
});

// Service Worker for caching (Progressive Web App features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}