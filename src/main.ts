import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Starenator &#11088";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Generate &#11088;";
app.append(button);

interface Star {
  name: string;
  cost: number;
  rate: number;
  increase: number;
  level: number;
}

const Stars: Star[] = [
  { name: "Dwarf Star", cost: 10, rate: 0, increase: 0.1, level: 0 },
  { name: "Giant Star", cost: 100, rate: 0, increase: 2, level: 0 },
  { name: "Supergiant Star", cost: 1000, rate: 0, increase: 50, level: 0 },
];

// Variables

let counter: number = 0;

let lastTime = 0;
let frameCount = 0;
let fps = 0;

// Buttons

const counterText = document.createElement("p");
counterText.innerHTML = `Starage: ${counter.toFixed(2)} &#11088!`;
app.append(counterText);

button.addEventListener("click", function () {
  counter++;
  counterText.innerHTML = `Starage: ${counter.toFixed(2)} &#11088!`;
});

const upgrade1 = document.createElement("button");
const upgrade1Text = document.createElement("p");
createUpgrade(upgrade1, upgrade1Text, 0);
initializeText(upgrade1Text, `${Stars[0].rate} stars / sec`);

const upgrade2 = document.createElement("button");
const upgrade2Text = document.createElement("p");
createUpgrade(upgrade2, upgrade2Text, 1);
initializeText(upgrade2Text, `${Stars[1].rate} stars / sec`);

const upgrade3 = document.createElement("button");
const upgrade3Text = document.createElement("p");
createUpgrade(upgrade3, upgrade3Text, 2);
initializeText(upgrade3Text, `${Stars[2].rate} stars / sec`);

function initializeText(text: HTMLParagraphElement, initalText: string) {
  text.innerHTML = initalText;
  app.append(text);
}

function createUpgrade(upgrade: any, upgradeText: any, s: number) {
  upgrade.innerHTML = `${Stars[s].name}: ${Stars[s].cost.toFixed(2)} stars`;
  app.append(upgrade);
  upgrade.disabled = true;

  upgrade.addEventListener("click", function () {
    counter -= Stars[s].cost;
    Stars[s].cost = round(Stars[s].cost * 1.15);
    upgrade.innerHTML = `${Stars[s].name}: ${Stars[s].cost} stars`;
    counterText.innerHTML = `Starage: ${counter.toFixed(2)} &#11088!`;
    Stars[s].rate += Stars[s].increase;
    Stars[s].level++;
    upgrade.innerHTML = `${Stars[s].name}: ${Stars[s].cost.toFixed(2)} stars`;
    upgradeText.innerHTML = `${Stars[s].rate.toFixed(2)} stars / sec (Level ${
      Stars[s].level
    })`;
  });
}

function buttonStatus(upgrade: any, cost: number) {
  if (counter >= cost) {
    upgrade.disabled = false;
  } else {
    upgrade.disabled = true;
  }
}

function calculateFPS(timestamp: number) {
  const elapsed = timestamp - lastTime;

  frameCount++;

  if (elapsed >= 1000) {
    fps = (frameCount * 1000) / elapsed;
    frameCount = 0;
    lastTime = timestamp;
  }
}

function round(num: number) {
  return Math.round(num * 10) / 10;
}

function loop() {
  calculateFPS(performance.now());
  buttonStatus(upgrade1, Stars[0].cost);
  buttonStatus(upgrade2, Stars[1].cost);
  buttonStatus(upgrade3, Stars[2].cost);

  for (let i = 0; i < Stars.length; i++) {
    if (fps > 0) {
      counter = counter + Stars[i].rate / fps;
    }
  }
  counterText.innerHTML = `Starage: ${counter.toFixed(2)} &#11088!`;

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
