// Lightweight slider for portfolio projects
(function(){
    const carousel = document.querySelector('.carousel');
    if(!carousel) return;

    const slidesEl = carousel.querySelector('.slides');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsWrap = carousel.querySelector('.carousel-dots');

    let current = 0;
    let startX = 0;
    let isDragging = false;

    function renderDots(){
        dotsWrap.innerHTML = '';
        slides.forEach((s, i) => {
            const d = document.createElement('button');
            d.className = 'dot';
            d.setAttribute('aria-label', 'Go to slide ' + (i+1));
            d.addEventListener('click', () => goTo(i));
            dotsWrap.appendChild(d);
        });
        updateUI();
    }

    function updateUI(){
        slides.forEach((s,i) => {
            s.style.display = (i === current) ? 'block' : 'none';
            s.setAttribute('aria-hidden', i === current ? 'false' : 'true');
        });
        const dots = dotsWrap.querySelectorAll('.dot');
        dots.forEach((d,i)=> d.classList.toggle('active', i===current));
    }

    function goTo(i){
        current = (i + slides.length) % slides.length;
        updateUI();
    }

    function next(){ goTo(current+1); }
    function prev(){ goTo(current-1); }

    // keyboard
    document.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowLeft') prev();
        if(e.key === 'ArrowRight') next();
    });

    // touch
    slidesEl.addEventListener('touchstart', (e)=>{
        startX = e.touches[0].clientX;
        isDragging = true;
    }, {passive:true});
    slidesEl.addEventListener('touchmove', (e)=>{
        if(!isDragging) return;
        const dx = e.touches[0].clientX - startX;
        // small threshold handled on end
    }, {passive:true});
    slidesEl.addEventListener('touchend', (e)=>{
        if(!isDragging) return;
        const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
        const dx = endX - startX;
        if(Math.abs(dx) > 40){
            if(dx < 0) next(); else prev();
        }
        isDragging = false;
    });

    // buttons
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // init
    renderDots();
    goTo(0);
})();

