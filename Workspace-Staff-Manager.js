const buttonAddWorker = document.getElementById("btn_worker");
const manageJobModal = document.getElementById("manage-modale");
const CloseModal = document.getElementById("close_modal");
const butModalFermer = document.getElementById("but_fermme");
const addExperienceButton = document.getElementById("but_add_exp");
const butEnregistrer = document.getElementById("but_enregistrer");
const modalAfichageInfo = document.getElementById("modale_information");
const namee = document.getElementById("name");
const url = document.getElementById("photo");
const role = document.getElementById("role");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const fermmeCardeEmploye = document.getElementById("fermmr_card_employe");
const photo_url = document.getElementById("photo_url");

const information_employe = {
  name_info: document.getElementById("name_info"),
  role_info: document.getElementById("role_info"),
  email_info: document.getElementById("email_info"),
  phone_info: document.getElementById("phone_info"),
  experiences_info: document.getElementById("experiences_info"),
};
const modifier_Buttons = document.getElementsByClassName("edit_employe_btn");
const ferméModaleInformation = document.getElementById(
  "fermé_modale_information"
);

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
    div.setAttribute("class", "container_card_employe");
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
    message:
      "Le numero de telephone a commencer par +212 apré du 6 ou 7 puis contenir 8 chiffre.",
  },
  imageUrl: {
    regex: /^https?:\/\/.*\.(png|jpg|jpeg|gif|svg|webp)$/i,
    message: "Format d'URL non valide.",
  },
};

function basculerError(espace, afficher, message = "") {
  if (afficher) {
    espace.nextElementSibling.style.color = "red";
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

url.addEventListener("input", () => {
  if (PhotoUrlValidation(url.value)) {
    photo_url.src = url.value;
  } else {
    url.nextElementSibling.textContent = ReglesDeValidation["imageUrl"].message;
  }
});

function enregistreEmploye() {
  const datastoryge = getemployes();
  const employe = {
    idEmploye: new Date().getTime().toString(),
    nameEmploye: namee.value,
    roleEmploye: role.value,
    urlPhotoEmploye: url.value,
    emailEmploye: email.value,
    phoneEmploye: phone.value,
    assigned: false,
    room: "",
  };
  datastoryge.push(employe);
  localStorage.setItem("employes", JSON.stringify(datastoryge));
  renderEmployeList();
  alert("employé enregistre avec un succé");
}

butEnregistrer.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validForm()) return;
  enregistreEmploye();
  manageJobModal.style.display = "none";
  document.querySelector("form").reset();
  photo_url.src = "";
});

function afficherDetails() {}

function getemployes() {
  let employe = localStorage.getItem("employes");
  console.log("je suis la", employe);
  if (employe) {
    return JSON.parse(employe);
  } else {
    return [];
  }
}

ouvrir(buttonAddWorker, manageJobModal);
fermme(CloseModal, manageJobModal);
fermme(butModalFermer, manageJobModal);
fermme(ferméModaleInformation, modalAfichageInfo);

function modificationInfoEmploye() {
  for (let btn of modifier_Buttons) {
    btn.addEventListener("click", (e) => {
      let id = e.target.closest(".card-employe").getAttribute("data-id");

      console.log("employyyyy", employe_find);
      e.preventDefault();
      console.log("yyyyyy", id);
      manageJobModal.style.display = "flex";
      namee.value = employe_find.nameEmploye;
      namee.setAttribute("disabled", "true");

      url.value = employe_find.urlPhotoEmploye;
      url.setAttribute("disabled", "true");

      role.value = employe_find.roleEmploye;
      role.setAttribute("disabled", "true");

      email.value = employe_find.emailEmploye;
      email.setAttribute("disabled", "true");

      phone.value = employe_find.phoneEmploye;
      phone.setAttribute("disabled", "true");
      console.log("gg");
      console.log(employe_find);
    });
  }
}

function getId() {
  const cardEmployé = document.querySelectorAll(".card-employe");
  cardEmployé.forEach((element) => {
    element.addEventListener("click", (e) => {
      modalAfichageInfo.style.display = "flex";
      var idWorker = e.target.closest(".card-employe").getAttribute("data-id");
      console.log(idWorker);

      aficherInformationEmploye(idWorker);
    });
  });
}
getId();

function aficherInformationEmploye(idWorker) {
  let employs = getemployes();
  let emp = employs.find((employ) => employ.idEmploye === idWorker);
  console.log(emp);
  // information_employe.name_info.textContent = emp.nameEmploye
  // information_employe.role_info.textContent = emp.roleEmploye
  // information_employe.email_info.textContent = emp.emailEmploye
  // information_employe.phone_info.textContent = emp.phoneEmploye
  // console.log("jesoi" ,information_employe.name_info.textContent);
  // information_employe.experiences_info.textContent = emp.experiences
  const modalInfo = document.querySelector(".information_modal");
  const newdiv = document.createElement("div");
  newdiv.innerHTML = `
            <h3 id="">informaition imployée</h3>
              <h1>${emp.nameEmploye}</h1>
              <p id="name_info">${emp.emailEmploye}</p>
              <p id="role_info">${emp.phoneEmploye}</p>
              <p id="email_info">${emp.roleEmploye}</p>
              <img src = ${emp.urlPhotoEmploye}>
          `;
  modalInfo.appendChild(newdiv);
}

fermme(ferméModaleInformation, modalAfichageInfo);
modificationInfoEmploye();

const ajouterMembre = document.querySelectorAll(".add_in_room");

ajouterMembre.forEach((element) => {
  element.addEventListener("click", (e) => {
    let workers = getemployes();
    let room = e.target.closest(".room");

    const list = document.getElementById("aff_employe_room");
    list.style.display = "block";
    list.innerHTML = "<button id='fermme_list'>X</button>";
    for (let item of workers) {
      list.innerHTML += `
      <div class="aff_employe" data-id="${item.idEmploye}">
      <h3>
      ${item.nameEmploye}
      </h3>
      <button class="assignButton">
        Assign
      </button>

      </div>
      
      `;
      for (let assignButton of document.getElementsByClassName(
        "assignButton"
      )) {
        assignButton.addEventListener("click", (event) => {
          let roomId = room.getAttribute("id");
          let workerId = event.target
            .closest(".aff_employe")
            .getAttribute("data-id");
          console.log(workerId);
          let updatedWorkers = workers.map((item) => {
              if(item.idEmploye == workerId){
                return{...item,assigned:true,room:roomId}
              }
          });
          localStorage.setItem("employes", JSON.stringify(updatedWorkers));
        });
      }
    }

    // list.appendChild(childrenList);
  });
});
// fermme(but_ferme_list, list);

const but_ferme_list = document.getElementById("fermme_list");
if (but_ferme_list) {
  but_ferme_list.addEventListener("click", () => {
    list.style.display = "none";
  });
}
