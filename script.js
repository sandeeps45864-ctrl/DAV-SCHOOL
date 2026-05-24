const form = document.getElementById("admissionForm");

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
            "https://signup-login-1-b57h.onrender.com/api/admission",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)
            }
        );

        if (response.ok) {

            alert("Admission Form Submitted Successfully");

            form.reset();

        } else {

            alert("Failed To Submit Form");
        }

    } catch (error) {

        console.log(error);

        alert("Server Error");
    }

});