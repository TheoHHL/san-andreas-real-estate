// GSAP INIT
gsap.registerPlugin(ScrollTrigger);

// Firebase
const firebaseConfig = { /* YOUR CONFIG */ };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// CURSOR
document.addEventListener('mousemove', (e) => {
    gsap.to('.cursor', { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to('.cursor2', { x: e.clientX, y: e.clientY, duration: 0.15 });
});

// HEADER SCROLL
window.addEventListener('scroll', () => {
    document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 50);
});

// HERO ANIMATIONS
gsap.from('.hero-title .title-line', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,
    ease: 'power3.out'
});
gsap.from('.hero-stats .stat', {
    scale: 0.8,
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: '.hero'
});

// FEATURED FIREBASE
function loadFeatured() {
    db.collection('properties').where('visible', '==', true).limit(3).get().then(snapshot => {
        snapshot.forEach((doc, i) => {
            const data = doc.data();
            const card = document.querySelectorAll('.featured-card')[i];
            card.classList.remove('skeleton');
            card.querySelector('.card-title').textContent = data.title;
            card.querySelector('.card-details').textContent = `${data.type} • ${data.quartier}`;
            card.querySelector('.card-price').textContent = data.price;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadFeatured();
    
    // SCROLL ANIMATIONS
    gsap.utils.toArray('.featured-card').forEach((card, i) => {
        gsap.fromTo(card, 
            { y: 100, opacity: 0, rotationY: -20 },
            { 
                y: 0, opacity: 1, rotationY: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                }
            }
        );
    });
});
