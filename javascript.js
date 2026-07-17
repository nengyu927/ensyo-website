        const header = document.querySelector('#header'), menuBtn = document.querySelector('#menuBtn'), navLinks = document.querySelector('#navLinks');
        addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 20)); menuBtn.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', open); menuBtn.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}"></i>` }); navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { navLinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>' }));
        const slides = [...document.querySelectorAll('.slide')], current = document.querySelector('#current'), progress = document.querySelector('#progress'); let index = 0, timer; function show(i) { index = (i + slides.length) % slides.length; slides.forEach((s, n) => s.classList.toggle('active', n === index)); current.textContent = String(index + 1).padStart(2, '0'); progress.classList.remove('play'); void progress.offsetWidth; progress.classList.add('play'); clearTimeout(timer); timer = setTimeout(() => show(index + 1), 5000) } document.querySelector('#prev').onclick = () => show(index - 1); document.querySelector('#next').onclick = () => show(index + 1); show(0);
        const revealElements = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            }), { threshold: .05, rootMargin: '0px 0px -30px 0px' });
            revealElements.forEach(el => observer.observe(el));
        } else {
            revealElements.forEach(el => el.classList.add('visible'));
        }
        const date = document.querySelector('#date'); date.min = new Date().toISOString().split('T')[0]; document.querySelector('#bookingForm').addEventListener('submit', e => { e.preventDefault(); document.querySelector('#formNote').style.display = 'block'; e.target.querySelector('button').textContent = '訂位需求已送出'; });

        // High-resolution hero images no longer repaint while the user is reading
        // lower sections. This prevents mobile GPU compositing jitter at page end.
        const heroPlaybackObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                show(index);
            } else {
                clearTimeout(timer);
                progress.classList.remove('play');
            }
        }, { threshold: 0.05 });
        heroPlaybackObserver.observe(document.querySelector('.hero'));
