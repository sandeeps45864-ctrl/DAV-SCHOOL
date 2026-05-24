const tableBody = document.getElementById("tableBody");

async function loadAdmissions(){

    try{

        const response = await fetch("/api/admissions");

        const data = await response.json();

        tableBody.innerHTML = "";

        data.forEach((item)=>{

            tableBody.innerHTML += `

            <tr>

                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.className}</td>
                <td>${item.message}</td>

                <td>
                    <button onclick="deleteAdmission('${item._id}')">
                        Delete
                    </button>
                </td>

            </tr>

            `;

        });

    }catch(error){

        console.log(error);

    }

}

async function deleteAdmission(id){

    const confirmDelete = confirm("Delete this admission?");

    if(confirmDelete){

        await fetch(`/api/admissions/${id}`,{

            method:"DELETE"

        });

        loadAdmissions();

    }

}

loadAdmissions();