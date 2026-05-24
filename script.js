window.addEventListener("scroll", () => {

    const navbar =
    document.querySelector(".navbar");

    if(window.scrollY > 50){

        navbar.style.background =
        "#061f4f";

    }else{

        navbar.style.background =
        "#0B3D91";

    }

});





const form =
document.getElementById(
    "admissionForm"
);

form.addEventListener(
    "submit",

    async (e) => {

    e.preventDefault();

    const formData = {

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        phone:
        document.getElementById("phone").value,

        className:
        document.getElementById("className").value,

        message:
        document.getElementById("message").value

    };

    try{

        const response =
        await fetch(

"https://signup-login-1-b57h.onrender.com/api/admission",

        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify(formData)

        });

        const data =
        await response.json();

        alert(data.message);

        form.reset();

    }catch(error){

        alert("Server Error");

    }

});





async function loadGallery(){

    try{

        const response =
        await fetch(

"https://signup-login-1-b57h.onrender.com/api/gallery"

        );

        const data =
        await response.json();

        const galleryGrid =
        document.getElementById(
            "galleryGrid"
        );

        galleryGrid.innerHTML = "";

        data.forEach((item)=>{

            galleryGrid.innerHTML += `

            <img
            src="https://signup-login-1-b57h.onrender.com/uploads/${item.image}"
            >

            `;

        });

    }catch(error){

        console.log(error);

    }

}

loadGallery();