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

function loadFeaturedProperties() {
    db.collection('properties')
        .where('visible', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(3)
        .get()
        .then(snapshot => {
            const cards = document.querySelectorAll('#featured-properties .featured-card');
            snapshot.forEach((doc, index) => {
                if (cards[index]) {
                    const data = doc.data();
                    cards[index].classList.remove('skeleton');
                    cards[index].innerHTML = `
                        <div class="content">
                            <h3>${data.title}</h3>
                            <p>${data.type} • ${data.quartier}</p>
                            <div class="price">${data.price}</div>
                        </div>
                    `;
                }
            });
        })
        .catch(() => {
            // Fallback
            const cards = document.querySelectorAll('#featured-properties .featured-card');
            cards[0].innerHTML = '<div class="content"><h3>Villa Premium</h3><p>6ch • Los Santos</p><div class="price">2.450.000 $</div></div>';
        });
}

document.addEventListener('DOMContentLoaded', loadFeaturedProperties);
