function drag(event) {
  // گرفتن کد بلوک
  event.dataTransfer.setData("code", event.target.dataset.code);
}

function allowDrop(event) {
  // اجازه drop
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();

  const code = event.dataTransfer.getData("code");

  // ساخت بلوک داخل workspace
  const div = document.createElement("div");
  div.className = "block";
  div.dataset.code = code;
  div.innerText = code;

  // اضافه کردن به workspace
  document.querySelector(".workspace").appendChild(div);
}

function run() {
  let html = "";
  let css = "";
  let js = "";

  // خواندن همه بلوک‌ها
  document.querySelectorAll(".workspace .block").forEach(block => {
    const code = block.dataset.code;

    // تشخیص ساده نوع کد
    if (code.includes("<")) {
      html += code + "\n";
    } 
    else if (code.includes("{")) {
      css += code + "\n";
    } 
    else {
      js += code + "\n";
    }
  });

  // اجرای خروجی داخل iframe
  document.getElementById("frame").srcdoc = `
<!DOCTYPE html>
<html>
<head>
<style>
${css}
</style>
</head>
<body>

${html}

<script>
${js}
<\/script>

</body>
</html>
  `;
}
