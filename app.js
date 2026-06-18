function drag(e) {
  e.dataTransfer.setData("code", e.target.dataset.code);
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();

  const code = e.dataTransfer.getData("code");

  const div = document.createElement("div");
  div.className = "block";
  div.innerText = code;

  div.dataset.code = code;

  document.querySelector(".workspace").appendChild(div);
}

function run() {
  let html = "";

  document.querySelectorAll(".workspace .block").forEach(b => {
    html += b.dataset.code + "\n";
  });

  document.getElementById("frame").srcdoc = html;
}
import { BLOCKS } from "./blocks/registry.js";

// اضافه کردن بلوک به UI
function createBlock(block, containerId) {
  const div = document.createElement("div");
  div.className = "block";
  div.innerText = block.name;
  div.dataset.code = block.code;

  div.draggable = true;

  div.ondragstart = (e) => {
    e.dataTransfer.setData("code", block.code);
  };

  document.getElementById(containerId).appendChild(div);
}

// لود همه بلوک‌ها
async function loadBlocks() {
  for (let path of BLOCKS.html) {
    const mod = await import(path);
    createBlock(mod.default, "htmlBox");
  }

  for (let path of BLOCKS.css) {
    const mod = await import(path);
    createBlock(mod.default, "cssBox");
  }

  for (let path of BLOCKS.js) {
    const mod = await import(path);
    createBlock(mod.default, "jsBox");
  }
}

loadBlocks();

// workspace
window.allowDrop = (e) => e.preventDefault();

window.drop = (e) => {
  e.preventDefault();

  const code = e.dataTransfer.getData("code");

  const div = document.createElement("div");
  div.className = "block";
  div.innerText = code;
  div.dataset.code = code;

  document.querySelector(".workspace").appendChild(div);
};

// run
window.run = () => {
  let html = "";
  let css = "";
  let js = "";

  document.querySelectorAll(".workspace .block").forEach(b => {
    const code = b.dataset.code;

    if (code.includes("<")) html += code + "\n";
    else if (code.includes("{")) css += code + "\n";
    else js += code + "\n";
  });

  document.getElementById("frame").srcdoc = `
<style>${css}</style>
${html}
<script>${js}<\/script>
`;
};