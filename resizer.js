const resizer = document.getElementById("resizer");
const editor = document.querySelector(".editor");
const preview = document.querySelector(".preview");

let isDragging = false;

resizer.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  let width = e.clientX;

  editor.style.width = width + "px";
  preview.style.width = (window.innerWidth - width - 5) + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});