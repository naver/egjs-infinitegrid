
const tid = "UA-70842526-18";
const z = Math.floor(Math.random() * 10000000);

function random() {
    return Math.floor((Math.random() * Math.pow(10, 10)));
}
function setCookie(name, value) {
    const date = new Date();

    date.setTime(date.getTime() + 3600 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}
function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");
    const length = cookies.length;

    for (let i = 0; i < length; ++i) {
        const text = cookies[i].trim();

        if (text.indexOf(cookieName) === 0) {
            return text.substring(cookieName.length);
        }
    }
    return "";
}

export function ga(title: string) {
  try {
    const _ga = getCookie("_ga") || `GA1.3.${random()}.${random()}`;

    setCookie("_ga", _ga);
    const cid = _ga.replace(/GA\d+\.\d+\./g, "");
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const screen = window.screen || { width: innerWidth, height: innerHeight };
    const collectInfos = [
      "v=1",
      "t=pageview",
      `dl=${location.href}`,
      `ul=${(navigator.language || "en-us").toLowerCase()}`,
      `de=${document.charset || document.inputEncoding || document.characterSet || "utf-8"}`,
      `dr=${document.referrer}`,
      `dt=${title}`,
      `sr=${screen.width}x${screen.height}`,
      `vp=${innerWidth}x${innerHeight}`,
      `cid=${cid}`,
      `tid=${tid}`,
      `z=${z}`,
    ];
    const req = new XMLHttpRequest();
    req.open("GET", `https://www.google-analytics.com/collect?${collectInfos.join("&")}`);
    req.send();
  // tslint:disable-next-line: no-empty
  } catch (e) { }
}
