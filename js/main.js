const firebaseConfig = {
    apiKey: "AIzaSyCKYyeJnRPGir4UzKzChYSLpQgV4CmVp6c",
    authDomain: "san-andreas-real-estate-2025.firebaseapp.com",
    projectId: "san-andreas-real-estate-2025",
    storageBucket: "san-andreas-real-estate-2025.firebasestorage.app",
    messagingSenderId: "1075543492610",
    appId: "1:1075543492610:web:8a853dfd3927861fcd3f1b"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function loadProperties(containerId) {
    db.collection('properties').where('visible', '==', true).orderBy('createdAt', 'desc').limit(3).get()
    .then(snapshot => {
        const cards = document.querySelectorAll(`${containerId} .hero-property-card`);
        snapshot.forEach((doc, index) => {
            if (cards[index]) {
                const data = doc.data();
                cards[index].classList.remove('skeleton');
                cards[index].innerHTML = `
                    <h4>${data.title}</h4>
                    <p>${data.type} • ${data.quartier}</p>
                    <div class="hero-price">${data.price}</div>
                    <div class="hero-status ${data.status}">💰 À vendre</div>
                `;
            }
        });
    }).catch(() => {
        document.querySelector(`${containerId} .hero-property-card`).innerHTML = 
            '<h4>Test 1M$</h4><p>Villa • Los Santos</p><div class="hero-price">1M$</div><div class="hero-status">💰 À vendre</div>';
    });
}
