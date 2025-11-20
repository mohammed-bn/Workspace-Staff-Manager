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

