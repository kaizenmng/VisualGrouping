document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('i');

                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                        otherQuestion.classList.remove('active');
                        otherQuestion.nextElementSibling.classList.remove('open');
                        otherQuestion.querySelector('i').style.transform = 'rotate(0deg)';
                    }
                });

                question.classList.toggle('active');
                answer.classList.toggle('open');
                
                icon.style.transform = answer.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
            });
        });
    }

    const navLinks = document.querySelectorAll('.nav-links a');
    const headerHeight = document.getElementById('site-header').offsetHeight;
    const sections = document.querySelectorAll('section');

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    const setActiveLink = () => {
        let currentActive = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 1;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentActive) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // Horizontal Scroll Carousel
    const scrollContainer = document.querySelector('.horizontal-scroll-container');
    const prevBtn = document.querySelector('.carousel-btn.prev-btn');
    const nextBtn = document.querySelector('.carousel-btn.next-btn');
    const cards = document.querySelectorAll('.player-card');

    if (scrollContainer && prevBtn && nextBtn) {
        let cardWidth = cards[0].offsetWidth + 20; // Width of one card plus gap
        
        nextBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });
    }
});