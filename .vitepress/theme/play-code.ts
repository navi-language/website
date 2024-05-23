const registerPlayButton = () => {
  const pres = document.querySelectorAll(".language-nv");
  pres.forEach((pre) => {
    if (pre.querySelector("button.play")) return;

    const code = pre.querySelector("code");
    if (!code) return;

    let source = code.textContent || "";
    if (!source) return;

    const playCode = document.createElement("button");
    playCode.innerHTML = "Run";
    playCode.classList.add("play");
    playCode.addEventListener("click", () => {
      runCode(code.textContent || "");
    });
    pre.prepend(playCode);
  });
};

const runCode = (code: string) => {
  const url = "https://navi-lang.org/play?source=" + base64Encode(code);
  window.open(url, "_blank");
};

const base64Encode = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)));
};

const observer = new MutationObserver(registerPlayButton);
observer.observe(document.body, { childList: true, subtree: true });
