// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
// Initialize Firebase (Compat version)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Panel Slider Animation
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Password Show/Hide Toggle
const togglePasswordIcons = document.querySelectorAll('.toggle-password');

togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const inputId = icon.getAttribute('data-target');
        const passwordInput = document.getElementById(inputId);

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// --- GOOGLE & GITHUB SOCIAL AUTHENTICATION ---

// 1. Google Sign-In (Using class selector to catch buttons on both forms)
const googleBtns = document.querySelectorAll('.google-btn');
googleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GoogleAuthProvider();
        
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                alert(`Welcome, ${user.displayName}! (Google Sign-In Successful)`);
            })
            .catch((error) => {
                console.error(error.message);
                alert('Google Sign-In failed: ' + error.message);
            });
    });
});

// 2. GitHub Sign-In (Using class selector to catch buttons on both forms)
const githubBtns = document.querySelectorAll('.github-btn');
githubBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const provider = new firebase.auth.GithubAuthProvider();
        
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                alert(`Welcome, ${user.displayName || user.email}! (GitHub Sign-In Successful)`);
            })
            .catch((error) => {
                console.error(error.message);
                alert('GitHub Sign-In failed: ' + error.message);
            });
    });
});

// Handle Local Sign Up Form
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        const name = signupForm.querySelector('input[type="text"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelector('#signup-password').value;

        const userData = { name, email, password };
        localStorage.setItem(email, JSON.stringify(userData));

        alert('Account created successfully! Please sign in.');
        signupForm.reset();
        container.classList.remove("active");
    });
}

// Handle Local Sign In Form
const signinForm = document.getElementById('signin-form');
if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const email = signinForm.querySelector('input[type="email"]').value;
        const password = signinForm.querySelector('#signin-password').value;

        const storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            alert(`Welcome back, ${storedUser.name}!`);
        } else {
            alert('Invalid email or password. Please try again.');
        }
    });
}