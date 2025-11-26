// const buttonAddWorker = document.getElementById("btn_worker");
// const manageJobModal = document.getElementById("manage-modale");
// const CloseModal = document.getElementById("close_modal");
// const butModalFermer = document.getElementById("but_fermme");
// const addExperienceButton = document.getElementById("but_add_exp");
// const butEnregistrer = document.getElementById("but_enregistrer");
// const ferméModaleInformation = document.getElementById("fermé_modale_information");
// const modalAfichageInfo = document.getElementById("modale_information");


// const namee = document.getElementById("name");
// const url = document.getElementById("photo");
// const role = document.getElementById("role");
// const email = document.getElementById("Email");
// const phone = document.getElementById("phone");

// const fermmeCardeEmploye = document.getElementById("fermmr_card_employe");
// const cardEmployé = document.getElementById("card-employe");
// const photo_url = document.getElementById("photo_url");

// const information_employe = {
//   name_info: document.getElementById("name_info"),
//   role_info: document.getElementById("role_info"),
//   email_info: document.getElementById("email_info"),
//   phone_info: document.getElementById("phone_info"),
//   experiences_info: document.getElementById("experiences_info"),
// }
renderEmployeList();

// const validationRules = {
//   name: {
//     regex: /^[a-zA-Z\s'-]{2,50}$/,
//     message: "Name must be 2-50 letters only.",
//   },
//   role: {
//     regex: /^[a-zA-Z\s'-]{2,50}$/,
//     message: "Role must be 2-50 letters only.",
//   },
//   email: {
//     regex: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/,
//     message: "Invalid email format.",
//   },
//   phone: {
//     regex: /^\+212[67]\d{8}$/,
//     message: "Phone must be 8-15 digits.",
//   },
//   imageUrl: {
//     regex: /^https?:\/\/.*\.(png|jpg|jpeg|gif|svg|webp)$/i,
//     message: "Invalid URL format.",
//   },
// };

// function imageUrlValidation(url) {
//   return url.match(validationRules["imageUrl"].regex) ? true : false;
// }

// function validateDate(dateAPartir, dateDeFin) {
//   return dateAPartir <= dateDeFin ? true : false;
// }

// url.addEventListener("input", ()=> {
//   photo_url.src = url.value;
// })

function basculerError(espace, afficher, message = "") {
  if (afficher) {
    espace.classList.add("border-red");
    espace.nextElementSibling.textContent = message;
  } else {
    espace.classList.remove("border-red");
    espace.nextElementSibling.textContent = "";
  }
}

function validateField(field, value) {
  const rule = validationRules[field.name];
  if (value == "") {
    toggleError(field, true, "field is required");
    return false;
  }
  if (!rule.regex.test(value)) {
    toggleError(field, true, rule.message);
    return false;
  }
  toggleError(field, false);
  return true;
}

function validateForm() {
  let valid = true;

  const inputs = [
    {
      field: document.getElementById("name"),
      value: document.getElementById("name").value,
    },
    {
      field: document.getElementById("role"),
      value: document.getElementById("role").value,
    },
    {
      field: document.getElementById("email"),
      value: document.getElementById("email").value,
    },
    {
      field: document.getElementById("phone"),
      value: document.getElementById("phone").value,
    },
  ];
  for (let input of inputs) {
    if (!validateField(input.field, input.value)) {
      valid = false;
    }
  }
  return valid;
}

// buttonAddWorker.addEventListener("click", () => {
//   manageJobModal.style.display = "flex";
// });

// function fermme(elementEvent, elementDom) {
//   elementEvent.addEventListener("click", () => {
//     elementDom.style.display = "none";
//   });
// }

// function ouvrir(elementEvent, elementDom) {
//   elementEvent.addEventListener("click", () => {
//     elementDom.style.display = "flex";
//   });
// }

// ouvrir(buttonAddWorker,manageJobModal);
// fermme(CloseModal, manageJobModal);
// fermme(butModalFermer, manageJobModal);

// addExperienceButton.addEventListener("click", () => {
//   const nouveauBlocExp = document.createElement("div");
//   nouveauBlocExp.classList.add("exp_global");
//   nouveauBlocExp.innerHTML = `<div class="container_info">
//                                 <label for="text"> entreprise : </label><br>
//                                 <input class="input_info" type="text" id="expérience">
//                                 <span></span>
//                             </div>
//                             <div class="container_info">
//                                 <label for="text"> rôle : </label><br>
//                                 <input class="input_info" type="text" id="rôle">
//                                 <span></span>
//                             </div>
//                             <div class="container_info">
//                                 <label for="date">date de début : </label><br>
//                                 <input class="input_info" type="date">
//                                 <span></span>
//                             </div>
//                             <div class="container_info">
//                                 <label for="date"> date de fin : </label><br>
//                                 <input class="input_info" type="date">
//                                 <span></span>
//                             </div>`;
//   document.querySelector(".experiences").appendChild(nouveauBlocExp);
// });

function enregistreEmploye() {
  const datastoryge = getemployes();
  const employe = {
    idEmploye: new Date().getTime().toString(),
    nameEmploye: namee.value,
    roleEmploye: role.value,
    urlPhotoEmploye: url.value,
    emailEmploye: email.value,
    phoneEmploye: phone.value,
  };
  datastoryge.push(employe);
  localStorage.setItem("employes", JSON.stringify(datastoryge));
  renderEmployeList();
}

butEnregistrer.addEventListener("click", (e) => {
    e.preventDefault();
    if(!validateForm()) return
    enregistreEmploye();
});

function getemployes() {
  let employe = localStorage.getItem("employes");
  console.log("je suis la", employe);
  // localStorage.setItem();
  if (employe) {
    return JSON.parse(employe);
  } else {
    return [];
  }
}

// function renderEmployeList() {
//   let containeremploye = document.querySelector("#Staffs");
//   const employeData = getemployes();
//   containeremploye.innerHTML = "";

//   for (let employe of employeData) {
//     let div = document.createElement("div");
//     div.setAttribute("class","container_card_employe")

//     console.log(employe.idEmploye);
//     div.innerHTML = `
//                         <div id="card-employe" data-id="${employe.idEmploye}">
//                             <div class="content_card">
//                                 <div class="esp_photo">
//                                     <img class="photo" src="${employe.urlPhotoEmploye}" alt="">
//                                 </div>
//                                 <div class="info-employe">
//                                     <span class="nom">${employe.nameEmploye}</span>
//                                     <span class="role">${employe.roleEmploye}</span>
//                                 </div>
//                             </div>
//                             <div id="employe-btn">
//                                 <button class="edit_employe_btn id="modifier_card_employe"><i class="fa-solid fa-pen"></i></button>
//                                 <button class="delete_employe_btn" id="fermmr_card_employe"><i class="fa-solid fa-rectangle-xmark"></i></button>
//                             </div>
//                         </div>`;
//     containeremploye.appendChild(div);
//   }
// }

// function stockExpeience(){

//     const experiences = []

//     const expData = {
//       entrepriseNom : document.getElementById("expérience").value,
//       expRole : document.getElementById("rôle").value,
//       deraptDate : document.getElementById("derapt_date").value,
//       finDate : document.getElementById("fin_date").value
//     }
//     experiences.push(expData)
    
//    console.log(experiences)
//    return experiences
// }





