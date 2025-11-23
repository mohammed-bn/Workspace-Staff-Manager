const buttonAddWorker = document.getElementById("btn_worker");
const manageJobModal = document.getElementById("manage-modale");
const CloseModal = document.getElementById("close_modal");
const butModalFermer = document.getElementById("but_fermme");
const addExperienceButton = document.getElementById("but_add_exp");
const butEnregistrer = document.getElementById("but_enregistrer");
const ferméModaleInformation = document.getElementById("fermé_modale_information");
const modalAfichageInfo = document.getElementById("modale_information");

const namee = document.getElementById("name");
const url = document.getElementById("photo");
const role = document.getElementById("role");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const fermmeCardeEmploye = document.getElementById("fermmr_card_employe");
const cardEmployé = document.getElementById("card-employe");
const photo_url = document.getElementById("photo_url");

const information_employe = {
  name_info: document.getElementById("name_info"),
  role_info: document.getElementById("role_info"),
  email_info: document.getElementById("email_info"),
  phone_info: document.getElementById("phone_info"),
  experiences_info: document.getElementById("experiences_info"),
}

function fermme(elementEvent, elementDom) {
  elementEvent.addEventListener("click", () => {
    elementDom.style.display = "none";
  });
}

function ouvrir(elementEvent, elementDom) {
  elementEvent.addEventListener("click", () => {
    elementDom.style.display = "flex";
  });
}

addExperienceButton.addEventListener("click", () => {
  const nouveauBlocExp = document.createElement("div");
  nouveauBlocExp.classList.add("exp_global");
  nouveauBlocExp.innerHTML = `<div class="container_info">
                                <label for="text"> entreprise : </label><br>
                                <input class="input_info" type="text" id="expérience">
                                <span></span>
                            </div>
                            <div class="container_info">
                                <label for="text"> rôle : </label><br>
                                <input class="input_info" type="text" id="rôle">
                                <span></span>
                            </div>
                            <div class="container_info">
                                <label for="date">date de début : </label><br>
                                <input class="input_info" type="date">
                                <span></span>
                            </div>
                            <div class="container_info">
                                <label for="date"> date de fin : </label><br>
                                <input class="input_info" type="date">
                                <span></span>
                            </div>`;
  document.querySelector(".experiences").appendChild(nouveauBlocExp);
});

function renderEmployeList() {
  let containeremploye = document.querySelector("#Staffs");
  const employeData = getemployes();
  containeremploye.innerHTML = "";
  for (let employe of employeData) {
    let div = document.createElement("div");
    div.setAttribute("class","container_card_employe")
    console.log(employe.idEmploye);
    div.innerHTML = `
                        <div class="card-employe" data-id="${employe.idEmploye}">
                            <div class="content_card">
                                <div class="esp_photo">
                                    <img class="photo" src="${employe.urlPhotoEmploye}" alt="">
                                </div>
                                <div class="info-employe">
                                    <span class="nom">${employe.nameEmploye}</span>
                                    <span class="role">${employe.roleEmploye}</span>
                                </div>
                            </div>
                            <div id="employe-btn">
                                <button class="edit_employe_btn" id="modifier_card_employe"><i class="fa-solid fa-pen"></i></button>
                                <button class="delete_employe_btn" id="fermmr_card_employe"><i class="fa-solid fa-rectangle-xmark"></i></button>
                            </div>
                        </div>`;
    containeremploye.appendChild(div);
  }
}

renderEmployeList();

const ReglesDeValidation = {
  name: {
    regex: /^[a-zA-Z\s'-]{2,50}$/,
    message: "Le nom doit comporter entre 2 et 50 lettres uniquement.",
  },
  role: {
    regex: /^[a-zA-Z\s'-]{2,50}$/,
    message: "Le rôle doit comporter entre 2 et 50 lettres uniquement.",
  },
  email: {
    regex: /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/,
    message: "Format d'adresse e-mail invalide.",
  },
  phone: {
    regex: /^\+212[67]\d{8}$/,
    message: "Le numero de telephone a commencer par +212 apré du 6 ou 7 puis contenir 8 chiffre.",
  },
  imageUrl: {
    regex: /^https?:\/\/.*\.(png|jpg|jpeg|gif|svg|webp)$/i,
    message: "Format d'URL non valide.",
  },
};

function basculerError(espace, afficher, message = "") {
  if (afficher) {
    espace.nextElementSibling.style.color = "red" ;
    espace.nextElementSibling.textContent = message;
  } else {
    espace.nextElementSibling.textContent = "";
  }
}

function validEspace(espace, value) {
  const rule = ReglesDeValidation[espace.id];
  if (value == "") {
    basculerError(espace, true, "field is required");
    return false;
  }
  if (!rule.regex.test(value)) {
    basculerError(espace, true, rule.message);
    return false;
  }
  basculerError(espace, false);
  return true;
}

function validForm() {
  let result = true;

  const inputs = [
    {
      espace: document.getElementById("name"),
      value: document.getElementById("name").value,
    },
    {
      espace: document.getElementById("email"),
      value: document.getElementById("email").value,
    },
    {
      espace: document.getElementById("phone"),
      value: document.getElementById("phone").value,
    },
  ];
  for (let input of inputs) {
    if (!validEspace(input.espace, input.value)) {
      result = false;
    }
  }
  return result;
}

function PhotoUrlValidation(url) {
  return url.match(ReglesDeValidation["imageUrl"].regex) ? true : false;
}

url.addEventListener("input", ()=> {
  if(PhotoUrlValidation(url.value)) {photo_url.src = url.value}
  else{
    url.nextElementSibling.textContent = ReglesDeValidation["imageUrl"].message
  }
})

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
  if(!validForm()) return
  enregistreEmploye();
  manageJobModal.style.display = "none";
  document.querySelector("form").reset();
  photo_url.src = "";
});

function getemployes() {
  let employe = localStorage.getItem("employes");
  console.log("je suis la", employe);
  if (employe) {
    return JSON.parse(employe);
  } else {
    return [];
  }
}

ouvrir(buttonAddWorker,manageJobModal);
fermme(CloseModal, manageJobModal);
fermme(butModalFermer, manageJobModal);
fermme(ferméModaleInformation,modalAfichageInfo );