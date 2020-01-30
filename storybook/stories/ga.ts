
const tid = "UA-70842526-18";
const cid = (Math.random() * Math.pow(10, 20)) / Math.pow(10, 10);
const z = Math.floor(Math.random() * 10000000);
export function ga(title: string) {
  try {
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
