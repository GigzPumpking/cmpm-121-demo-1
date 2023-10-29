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
  description: string;
}

const Stars: Star[] = [
  {
    name: "Subdwarf Star",
    cost: 10,
    rate: 0,
    increase: 0.1,
    level: 0,
    description:
      "The second smallest type of star, with a luminosity class of VI.",
  },
  {
    name: "Dwarf Star",
    cost: 50,
    rate: 0,
    increase: 0.5,
    level: 0,
    description:
      "Otherwise known as a main-sequence star, with a luminosity class of V.",
  },
  {
    name: "Giant Star",
    cost: 100,
    rate: 0,
    increase: 2,
    level: 0,
    description:
      "They lay above the main-sequence dwarf stars and have a luminosity class of III.",
  },
  {
    name: "Supergiant Star",
    cost: 1000,
    rate: 0,
    increase: 50,
    level: 0,
    description:
      "Supergiants are the largest stars in the universe, with a luminosity class of Ib to Ia.",
  },
  {
    name: "Hypergiant Star",
    cost: 10000,
    rate: 0,
    increase: 1000,
    level: 0,
    description:
      "Beyond comprehension, hypergiants are the largest stars in the universe, with a luminosity class of 0. One can only imagine their destructive demise into supernovae.",
  },
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

interface Upgrade {
  button: HTMLButtonElement;
  text: HTMLParagraphElement;
  s: number;
}

const upgrade1 = document.createElement("button");
const upgrade1Text = document.createElement("p");

const upgrade2 = document.createElement("button");
const upgrade2Text = document.createElement("p");

const upgrade3 = document.createElement("button");
const upgrade3Text = document.createElement("p");

const upgrade4 = document.createElement("button");
const upgrade4Text = document.createElement("p");

const upgrade5 = document.createElement("button");
const upgrade5Text = document.createElement("p");

const upgrades: Upgrade[] = [
  { button: upgrade1, text: upgrade1Text, s: 0 },
  { button: upgrade2, text: upgrade2Text, s: 1 },
  { button: upgrade3, text: upgrade3Text, s: 2 },
  { button: upgrade4, text: upgrade4Text, s: 3 },
  { button: upgrade5, text: upgrade5Text, s: 4 },
];

upgrades.forEach((upgrade) => {
  createUpgrade(upgrade.button, upgrade.text, upgrade.s);
  initializeText(upgrade.text, `${Stars[upgrade.s].rate} stars / sec`);
});

function initializeText(text: HTMLParagraphElement, initalText: string) {
  text.innerHTML = initalText;
  app.append(text);
}

function createUpgrade(upgrade: any, upgradeText: any, s: number) {
  upgrade.innerHTML = `${Stars[s].name}: ${Stars[s].cost.toFixed(2)} stars`;
  upgrade.title = Stars[s].description;
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
  upgrades.forEach((upgrade) => {
    buttonStatus(upgrade.button, Stars[upgrade.s].cost);
  });

  for (let i = 0; i < Stars.length; i++) {
    if (fps > 0) {
      counter = counter + Stars[i].rate / fps;
    }
  }
  counterText.innerHTML = `Starage: ${counter.toFixed(2)} &#11088!`;

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
