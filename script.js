window.addEventListener('scroll', () => {

    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(11,61,145,0.95)';
    } else {
        navbar.style.background = 'rgba(11,61,145,0.7)';
    }

});

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

const form = document.getElementById("admissionForm");

if(form){

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

            const response = await fetch("https://signup-login-1-b57h.onrender.com/admission", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)

            });

            const data = await response.json();

            alert(data.message);

            form.reset();

        } catch (error) {

            console.log(error);

            alert("❌ Cannot Connect To Server");

        }

    });

}