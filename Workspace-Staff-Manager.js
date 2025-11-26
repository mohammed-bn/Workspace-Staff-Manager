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

let conference_room_members = [];
let Reception_room_members = [];
let serveur_room_members = [];
let securite_room_members = [];
let  personnel_room_members = [];
let archives_room_members = [];

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

  employeData
    .filter((worker) => !conference_room_members.includes(worker.idEmploye)
     && !Reception_room_members.includes(worker.idEmploye)
     && !serveur_room_members.includes(worker.idEmploye)
     && !securite_room_members.includes(worker.idEmploye)
     && !personnel_room_members.includes(worker.idEmploye)
     && !archives_room_members.includes(worker.idEmploye))
    .forEach((employe) => {
      let div = document.createElement("div");
      div.setAttribute("class", "employee-card");
      div.innerHTML = `
        <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
        </div>
    `;

      div.addEventListener('click',() => {
          modalAide.style.display = "block";
          aficherInformationEmploye(employe.idEmploye);
      })
      containeremploye.appendChild(div);
    });
}



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

fermme(ferméModaleInformation, modalAfichageInfo);
modificationInfoEmploye();

// ================================================================================================================

const modalAide = document.getElementById("aff_employe_room");
const btnFermerModal = document.getElementById("btn_fermer_modal");
btnFermerModal.addEventListener("click", () => {
  modalAide.style.display = "none";
});

renderEmployeList();

function aficherInformationEmploye(idWorker) {
  let employs = getemployes();
  let emp = employs.find((employ) => employ.idEmploye === idWorker);
  modalAide.lastElementChild.innerHTML = `
            <h3 id="titel_info_imploye">informaition imployée</h3>
            <img class="employee-photo" id="info_imp-photo" src = ${emp.urlPhotoEmploye}>
            <h1 id="nom_emp" class="aff-info">${emp.nameEmploye}</h1>
            <p id="name_info" class="aff-info">${emp.emailEmploye}</p>
            <p id="role_info" class="aff-info">${emp.phoneEmploye}</p>
            <p id="email_info" class="aff-info">${emp.roleEmploye}</p>
          `;
}

const btnCondference = document.getElementById("add_in_conference");
btnCondference.addEventListener("click", () => {
  const rolesAcccepté = [
    "Réceptionnistes",
    "Techniciens IT",
    "Agents de sécurité",
    "Manager",
    "Nettoyage",
    "Autres rôles",
  ];
  modalAide.lastElementChild.innerHTML = "";
  modalAide.style.display = "block";

  let workers = getemployes();
  workers.filter(
      (worker) =>
        !conference_room_members.includes(worker.idEmploye) &&
        rolesAcccepté.includes(worker.roleEmploye)
    )
    .forEach((employe) => {
      const div = document.createElement("div");
      div.className = "employee-card";
      div.innerHTML = `
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
        </div>
    `;

      div.addEventListener("click", () => {
        conference_room_members.push(employe.idEmploye);

        renderEmployeList();
        renderConferenceRoom();
      });

      modalAide.lastElementChild.appendChild(div);
    });
});

function renderConferenceRoom() {
  let workers = getemployes();
  const conferenceRoomContainer = document.getElementById(
    "conference_room_container"
  );

  conferenceRoomContainer.innerHTML = '';

  conference_room_members.forEach((id) => {
    const employe = workers.find((emp) => (emp.idEmploye == id));

    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <button class="delete-btn">×</button>
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
            
        </div>
    `;

    const btnSupp = div.querySelector('.delete-btn');
    btnSupp.addEventListener('click', () => {
      conference_room_members = conference_room_members.filter((id) => id != employe.idEmploye);
      renderEmployeList();
      renderConferenceRoom();
    })

    conferenceRoomContainer.append(div);
  });
}


//==========================================================================================

const btnReseption = document.getElementById("add_in_reception");
btnReseption.addEventListener("click", () => {
  const rolesAcccepté = [
    "Réceptionnistes",
    "Techniciens IT",
    "Agents de sécurité",
    "Manager",
    "Nettoyage",
    "Autres rôles",
  ];
  modalAide.lastElementChild.innerHTML = "";
  modalAide.style.display = "block";

  let workers = getemployes();
  workers.filter(
      (worker) =>
        !Reception_room_members.includes(worker.idEmploye) &&
        rolesAcccepté.includes(worker.roleEmploye)
    )
    .forEach((employe) => {
      const div = document.createElement("div");
      div.className = "employee-card";
      div.innerHTML = `
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
        </div>
    `;

      div.addEventListener("click", () => {
        Reception_room_members.push(employe.idEmploye);

        renderEmployeList();
        renderReceptionRoom();
      });

      modalAide.lastElementChild.appendChild(div);
    });
});

function renderReceptionRoom() {
  let workers = getemployes();
  const reseptionRoomContainer = document.getElementById(
    "reception_room_container"
  );

  reseptionRoomContainer.innerHTML = '';

  Reception_room_members.forEach((id) => {
    const employe = workers.find((emp) => (emp.idEmploye == id));

    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <button class="delete-btn">×</button>
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
            
        </div>
    `;

    const btnSupp = div.querySelector('.delete-btn');
    btnSupp.addEventListener('click', () => {
      Reception_room_members = Reception_room_members.filter((id) => id != employe.idEmploye);
      renderEmployeList();
      renderReceptionRoom();
    })

    reseptionRoomContainer.append(div);
  });
}


//==========================================================================================

const btnServer = document.getElementById("add_in_server");
btnServer.addEventListener("click", () => {
  const rolesAcccepté = [
    "Techniciens IT",
    "Manager",
    "Nettoyage",
  ];
  modalAide.lastElementChild.innerHTML = "";
  modalAide.style.display = "block";

  let workers = getemployes();
  workers.filter(
      (worker) =>
        !serveur_room_members.includes(worker.idEmploye) &&
        rolesAcccepté.includes(worker.roleEmploye)
    )
    .forEach((employe) => {
      const div = document.createElement("div");
      div.className = "employee-card";
      div.innerHTML = `
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
        </div>
    `;

      div.addEventListener("click", () => {
        serveur_room_members.push(employe.idEmploye);

        renderEmployeList();
        renderServerRoom();
      });

      modalAide.lastElementChild.appendChild(div);
    });
});

function renderServerRoom() {
  let workers = getemployes();
  const serverRoomContainer = document.getElementById(
    "server_room_container"
  );

  serverRoomContainer.innerHTML = '';

  serveur_room_members.forEach((id) => {
    const employe = workers.find((emp) => (emp.idEmploye == id));

    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <button class="delete-btn">×</button>
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
            
        </div>
    `;

    const btnSupp = div.querySelector('.delete-btn');
    btnSupp.addEventListener('click', () => {
      serveur_room_members = serveur_room_members.filter((id) => id != employe.idEmploye);
      renderEmployeList();
      renderServerRoom()
    })

    serverRoomContainer.append(div);
  });
}


//==========================================================================================


const btnSecurite = document.getElementById("add_in_security");
btnSecurite.addEventListener("click", () => {
  const rolesAcccepté = [
    "Agents de sécurité",
    "Manager",
    "Nettoyage",
  ];
  modalAide.lastElementChild.innerHTML = "";
  modalAide.style.display = "block";

  let workers = getemployes();
  workers.filter(
      (worker) =>
        !securite_room_members.includes(worker.idEmploye) &&
        rolesAcccepté.includes(worker.roleEmploye)
    )
    .forEach((employe) => {
      const div = document.createElement("div");
      div.className = "employee-card";
      div.innerHTML = `
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
        </div>
    `;

      div.addEventListener("click", () => {
        securite_room_members.push(employe.idEmploye);

        renderEmployeList();
        rendersecuriteRoom();
      });

      modalAide.lastElementChild.appendChild(div);
    });
});

function rendersecuriteRoom() {
  let workers = getemployes();
  const securiteRoomContainer = document.getElementById(
    "securite_room_container"
  );

  securiteRoomContainer.innerHTML = '';

  securite_room_members.forEach((id) => {
    const employe = workers.find((emp) => (emp.idEmploye == id));

    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <button class="delete-btn">×</button>
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
            
        </div>
    `;

    const btnSupp = div.querySelector('.delete-btn');
    btnSupp.addEventListener('click', () => {
      securite_room_members = securite_room_members.filter((id) => id != employe.idEmploye);
      renderEmployeList();
      rendersecuriteRoom();
    })

    securiteRoomContainer.append(div);
  });
}

//==========================================================================================


const btnstaf = document.getElementById("add_in_staff");
btnstaf.addEventListener("click", () => {
  const rolesAcccepté = [
    "Réceptionnistes",
    "Techniciens IT",
    "Agents de sécurité",
    "Manager",
    "Nettoyage",
    "Autres rôles",
  ];
  modalAide.lastElementChild.innerHTML = "";
  modalAide.style.display = "block";

  let workers = getemployes();
  workers.filter(
      (worker) =>
        !personnel_room_members.includes(worker.idEmploye) &&
        rolesAcccepté.includes(worker.roleEmploye)
    )
    .forEach((employe) => {
      const div = document.createElement("div");
      div.className = "employee-card";
      div.innerHTML = `
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
        </div>
    `;

      div.addEventListener("click", () => {
        personnel_room_members.push(employe.idEmploye);

        renderEmployeList();
        renderstaffsRoom();
      });

      modalAide.lastElementChild.appendChild(div);
    });
});

function renderstaffsRoom() {
  let workers = getemployes();
  const staffRoomContainer = document.getElementById(
    "staf_room_container"
  );

  staffRoomContainer.innerHTML = '';

  personnel_room_members.forEach((id) => {
    const employe = workers.find((emp) => (emp.idEmploye == id));

    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <button class="delete-btn">×</button>
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
            
        </div>
    `;

    const btnSupp = div.querySelector('.delete-btn');
    btnSupp.addEventListener('click', () => {
      personnel_room_members = personnel_room_members.filter((id) => id != employe.idEmploye);
      renderEmployeList();
      renderstaffsRoom();
    })

    staffRoomContainer.append(div);
  });
}

//==========================================================================================
// logic de Archive room

const btnArchive = document.getElementById("add_in_archive");
btnArchive.addEventListener("click", () => {
  const rolesAcccepté = [
    "Réceptionnistes",
    "Techniciens IT",
    "Agents de sécurité",
    "Manager",
  ];
  modalAide.lastElementChild.innerHTML = "";
  modalAide.style.display = "block";

  let workers = getemployes();
  workers.filter(
      (worker) =>
        !archives_room_members.includes(worker.idEmploye) &&
        rolesAcccepté.includes(worker.roleEmploye)
    )
    .forEach((employe) => {
      const div = document.createElement("div");
      div.className = "employee-card";
      div.innerHTML = `
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
        </div>
    `;

      div.addEventListener("click", () => {
        archives_room_members.push(employe.idEmploye);

        renderEmployeList();
        renderArchiveRoom();
      });

      modalAide.lastElementChild.appendChild(div);
    });
});

function renderArchiveRoom() {
  let workers = getemployes();
  const archiveRoomContainer = document.getElementById(
    "archive_room_container"
  );

  archiveRoomContainer.innerHTML = '';

  archives_room_members .forEach((id) => {
    const employe = workers.find((emp) => (emp.idEmploye == id));

    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <button class="delete-btn">×</button>
      <div class="photo-wrapper">
            <img class="employee-photo"
                src="${employe.urlPhotoEmploye}"
                alt="">
        </div>
        <div class="employee-info">
            <span class="employee-name">${employe.nameEmploye}</span>
            <span class="employee-role">${employe.roleEmploye}</span>
            
        </div>
    `;

    const btnSupp = div.querySelector('.delete-btn');
    btnSupp.addEventListener('click', () => {
      archives_room_members  = archives_room_members .filter((id) => id != employe.idEmploye);
      renderEmployeList();
      renderArchiveRoom();
    })

    archiveRoomContainer.append(div);
  });
}