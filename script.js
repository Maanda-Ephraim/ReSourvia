// Initialize AOS for scroll animations
AOS.init({ duration: 800, once: false, mirror: true });

// Mock Data
const tenders = [
    { id: 1, title: "Construction of Solar-Powered Market", municipality: "Makhado Municipality", closing: "2026-06-20", amount: "R 3 200 000", badge: "New" },
    { id: 2, title: "Supply of Medical Equipment - Clinics", municipality: "Thulamela Municipality", closing: "2026-05-28", amount: "R 1 800 000", badge: "Urgent" },
    { id: 3, title: "Road Resealing Project Ward 9", municipality: "eThekwini", closing: "2025-07-05", amount: "R 4 500 000", badge: "Featured" },
    { id: 4, title: "IT Infrastructure for Libraries", municipality: "Tshwane", closing: "2026-06-12", amount: "R 950 000", badge: "" },
    { id: 5, title: "Waste Management Services", municipality: "Capricon Municipality", closing: "2026-06-30", amount: "R 2 100 000", badge: "New" }
];

const grants = [
    { id: 101, title: "Youth Entrepreneurship Grant", dept: "NYDA", amount: "R 50 000 - R 250 000", deadline: "2026-07-15", icon: "🚀" },
    { id: 102, title: "Green Energy Business Fund", dept: "DMRE", amount: "Up to R 500 000", deadline: "2026-08-01", icon: "🌱" },
    { id: 103, title: "NPO Capacity Building Grant", dept: "DSD", amount: "R 75 000", deadline: "2026-06-25", icon: "🤝" },
    { id: 104, title: "Women in Tech Grant", dept: "DCDT", amount: "R 120 000", deadline: "2026-07-20", icon: "💻" }
];

// Render Functions
function renderTenders() {
    const container = document.getElementById('tendersList');
    if (!container) return;
    container.innerHTML = tenders.map(t => `
        <div class="card-3d bg-white rounded-xl overflow-hidden shadow-md border-l-4 border-[#0B3B5F] tender-item p-5 hover:shadow-2xl transition-all" data-aos="flip-up" data-aos-delay="${t.id * 50}">
            <div class="flex justify-between items-start">
                <div><i class="fas fa-gavel text-[#D9A404] text-xl"></i><h3 class="font-extrabold text-lg mt-1">${t.title}</h3></div>
                ${t.badge ? `<span class="bg-[#D9A404] text-white text-xs px-2 py-1 rounded-full animate-pulse">${t.badge}</span>` : ''}
            </div>
            <p class="text-sm text-gray-500 mt-2"><i class="fas fa-map-marker-alt"></i> ${t.municipality} • <i class="far fa-calendar-alt"></i> closes: ${t.closing}</p>
            <p class="text-xl font-bold text-[#0B3B5F] mt-3">${t.amount}</p>
            <button class="mt-3 text-[#800020] font-semibold text-sm hover:translate-x-2 transition-transform inline-flex items-center gap-1">View Details <i class="fas fa-arrow-right"></i></button>
        </div>
    `).join('');
}

function renderGrants() {
    const container = document.getElementById('grantsList');
    if (!container) return;
    container.innerHTML = grants.map(g => `
        <div class="card-3d bg-white rounded-xl overflow-hidden shadow-md border-t-4 border-[#800020] grant-item p-5 hover:shadow-2xl transition-all" data-aos="flip-down" data-aos-delay="${g.id * 50}">
            <div class="flex items-center gap-3"><span class="text-3xl">${g.icon}</span><h3 class="font-extrabold text-lg">${g.title}</h3></div>
            <p class="text-sm text-gray-500 mt-2"><i class="fas fa-building"></i> ${g.dept} • <i class="far fa-clock"></i> Deadline: ${g.deadline}</p>
            <p class="text-lg font-bold text-[#800020] mt-2">💰 ${g.amount}</p>
            <button class="mt-3 text-[#D9A404] font-semibold text-sm hover:scale-105 transition-transform inline-flex items-center gap-1">Check Eligibility <i class="fas fa-external-link-alt"></i></button>
        </div>
    `).join('');
}

// User Management (localStorage)
let registeredUsers = JSON.parse(localStorage.getItem('resourviaUsers') || '[]');

// Modal Handling
const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');
const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const closeSignupModal = document.getElementById('closeSignupModal');
const switchToSignup = document.getElementById('switchToSignup');

signupBtn.onclick = () => signupModal.classList.remove('hidden');
loginBtn.onclick = () => loginModal.classList.remove('hidden');
closeSignupModal.onclick = () => signupModal.classList.add('hidden');
if (switchToSignup) {
    switchToSignup.onclick = () => {
        loginModal.classList.add('hidden');
        signupModal.classList.remove('hidden');
    };
}

// Signup Form
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const regNo = document.getElementById('regNo').value.trim();
    if (registeredUsers.some(u => u.email === email)) {
        alert("❌ Email already registered with ReSourvia! Use a unique email.");
        return;
    }
    if (regNo && registeredUsers.some(u => u.regNo === regNo)) {
        alert("❌ Registration/ID already exists.");
        return;
    }
    const newUser = {
        fullName: document.getElementById('fullName').value,
        email: email,
        phone: document.getElementById('phone').value,
        userType: document.getElementById('userType').value,
        regNo: regNo,
        password: document.getElementById('password').value
    };
    registeredUsers.push(newUser);
    localStorage.setItem('resourviaUsers', JSON.stringify(registeredUsers));
    alert("✅ Welcome to ReSourvia! Please login to continue.");
    signupModal.classList.add('hidden');
});

// Login Form
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pwd = document.getElementById('loginPassword').value;
    const user = registeredUsers.find(u => u.email === email && u.password === pwd);
    if (user) {
        alert(`✨ Welcome back ${user.fullName} to ReSourvia! Accessing your dashboard...`);
        loginModal.classList.add('hidden');
    } else {
        alert("❌ Invalid credentials. Please sign up first.");
    }
});

// Contact Form
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    alert(`📬 Thank you ${name}! ReSourvia has received your ${subject} inquiry. We'll respond within 24 hours at ${email}.`);
    e.target.reset();
});

// Close modals when clicking outside
window.onclick = (e) => {
    if (e.target === signupModal) signupModal.classList.add('hidden');
    if (e.target === loginModal) loginModal.classList.add('hidden');
};

// Initial Render
renderTenders();
renderGrants();
