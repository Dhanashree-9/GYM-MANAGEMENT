// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase configuration (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "AIzaSyCkrX7SaZYyPPwTnDTH30VTx11eSyzfNM4",
    authDomain: "first-dc645.firebaseapp.com",
    databaseURL: "https://first-dc645-default-rtdb.firebaseio.com",
    projectId: "first-dc645",
    storageBucket: "first-dc645.firebasestorage.app",
    messagingSenderId: "723518346868",
    appId: "1:723518346868:web:cebec254c6499ae7aea321"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up Function
export function signUpUser(email, password, fullName, role) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                email: email,
                role: role
            });

            alert("Sign-up successful!");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Login Function
export function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Get user role from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                redirectToDashboard(userData.role);
            } else {
                alert("User data not found!");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Redirect to Dashboard
function redirectToDashboard(role) {
    if (role === "admin") {
        window.location.href = "admindashboard.html";
    } else if (role === "user") {
        window.location.href = "userdashboard.html";
    } else if (role === "member") {
        window.location.href = "memberdashboard.html";
    } else {
        alert("Invalid role! Please contact support.");
    }
}
