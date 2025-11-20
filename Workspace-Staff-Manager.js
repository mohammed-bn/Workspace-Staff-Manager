const buttonAddWorker = document.getElementById("btn_worker");
const manageJobModal = document.getElementById("manage-modale");
const CloseModal = document.getElementById("close_modal");
const butModalFermer = document.getElementById("but_fermme");
const addExperienceButton = document.getElementById("but_add_exp");
const butEnregistrer = document.getElementById("but_enregistrer");

buttonAddWorker.addEventListener("click", () => {
  manageJobModal.style.display = "flex";
});

function fermme(elementEvent, elementDom) {
  elementEvent.addEventListener("click", () => {
    elementDom.style.display = "none";
  });
}
fermme(CloseModal, manageJobModal);
fermme(butModalFermer, manageJobModal);



addExperienceButton.addEventListener("click", () => {
    const nouveauBlocExp = document.createElement("div");
    nouveauBlocExp.classList.add('exp_global');
    nouveauBlocExp.innerHTML =`<div class="container_info">
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
                            </div>`
    document.querySelector(".experiences").appendChild(nouveauBlocExp);
});


