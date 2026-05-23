window.addEventListener('scroll', () => {

    const navbar = document.querySelector('.navbar');

    if (navbar) {

        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11,61,145,0.95)';
        } else {
            navbar.style.background = 'rgba(11,61,145,0.7)';
        }

    }

});



// 3D Card Effect

const cards = document.querySelectorAll(
'.stat-card, .facility-card, .feature-box, .achievement-card'
);

cards.forEach(card => {

    card.addEventListener('mousemove', (e) => {

        const x = e.offsetX;
        const y = e.offsetY;

        card.style.transform =
        `rotateY(${x / 25}deg) rotateX(${y / 25}deg) translateY(-10px)`;

    });

    card.addEventListener('mouseleave', () => {

        card.style.transform =
        'rotateY(0deg) rotateX(0deg)';

    });

});



// Admission Form Submit

const form = document.getElementById("admissionForm");

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = {

            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            className: document.getElementById("className").value,
            message: document.getElementById("message").value

        };

        try {

            const response = await fetch(
                "https://signup-login-1-b57h.onrender.com/admission",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            alert(data.message);

            form.reset();

        } catch (error) {

            console.log(error);

            alert("❌ Cannot Connect To Server");

        }

    });

}



// LOGIN / SIGNUP TABS

function switchTab(tab) {

    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');

    tabs.forEach((t, i) => {

        t.classList.toggle(
            'active',
            (i === 0) === (tab === 'login')
        );

    });

    panels.forEach((p) => {

        p.classList.toggle(
            'active',
            p.id === tab
        );

    });

}



// PASSWORD STRENGTH

function checkStrength(val) {

    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const bars = document.getElementById('strength-bars');

    if (bars) {
        bars.className = 'strength' + (score ? ' s' + score : '');
    }

    const hints = [
        'At least 8 characters',
        'Too short — add more characters',
        'Add numbers or symbols',
        'Almost there — try a symbol',
        'Strong password'
    ];

    const hint = document.getElementById('pwd-hint');

    if (hint) {
        hint.textContent = hints[score];
    }

}