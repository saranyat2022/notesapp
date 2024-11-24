const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
  notesContainer.innerHTML = localStorage.getItem("notes") || "";
  const notes = document.querySelectorAll(".input-box");

  notes.forEach((note) => {
    attachDeleteListener(note);
  });
}

function updateStorage() {
  localStorage.setItem("notes", notesContainer.innerHTML);
}

function attachDeleteListener(note) {
  let deleteIcon = note.querySelector("img");
  if (!deleteIcon) {
    deleteIcon = document.createElement("img");
    deleteIcon.src = "images/delete.png";
    note.appendChild(deleteIcon);
  }
  deleteIcon.addEventListener("click", function () {
    note.remove();
    updateStorage();
  });

  note.onkeyup = function () {
    updateStorage();
  };
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");

  let img = document.createElement("img");
  img.src = "images/delete.png";
  inputBox.appendChild(img);

  notesContainer.appendChild(inputBox);

  // Attach event listeners for the new note
  attachDeleteListener(inputBox);

  updateStorage();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.execCommand("insertLineBreak");
    event.preventDefault();
    updateStorage();
  }
});

showNotes();
