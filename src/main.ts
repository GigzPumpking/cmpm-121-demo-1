import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Uh Oh! Stinky!";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Click me! &#11088;";
app.append(button);

// Variables

let counter: number = 0;
let loopTime: number = 0;

const generators: number[] = [0, 0, 0];
const generatorLevels: number[] = [0, 0, 0];
const generatorCosts: number[] = [10, 100, 1000];

let lastTime = 0;
let frameCount = 0;
let fps = 0;

// Buttons

const counterText = document.createElement("p");
counterText.innerHTML = `Clicked ${counter.toFixed(1)} times!`;
app.append(counterText);

button.addEventListener("click", function () {
  counter++;
  counterText.innerHTML = `Clicked ${counter.toFixed(1)} times!`;
});

const upgrade1 = document.createElement("button");
const upgrade1Text = document.createElement("p");
createUpgrade(
  upgrade1,
  upgrade1Text,
  0,
  0.1,
  `Generator 1: ${generatorCosts[0].toFixed(1)} stars`,
);
initializeText(upgrade1Text, `${generators[1]} stars / sec`);

const upgrade2 = document.createElement("button");
const upgrade2Text = document.createElement("p");
createUpgrade(
  upgrade2,
  upgrade2Text,
  1,
  2,
  `Generator 2: ${generatorCosts[1].toFixed(1)} stars`,
);
initializeText(upgrade2Text, `${generators[1]} stars / sec`);

const upgrade3 = document.createElement("button");
const upgrade3Text = document.createElement("p");
createUpgrade(
  upgrade3,
  upgrade3Text,
  2,
  50,
  `Generator 3: ${generatorCosts[2].toFixed(1)} stars`,
);
initializeText(upgrade3Text, `${generators[2]} stars / sec`);

function initializeText(text: HTMLParagraphElement, initalText: string) {
  text.innerHTML = initalText;
  app.append(text);
}

function createUpgrade(
  upgrade: any,
  upgradeText: any,
  gen: number,
  increase: number,
  initialText: string,
) {
  upgrade.innerHTML = initialText;
  app.append(upgrade);
  upgrade.disabled = true;

  upgrade.addEventListener("click", function () {
    counter -= generatorCosts[gen];
    generatorCosts[gen] = round(generatorCosts[gen] * 1.15);
    upgrade.innerHTML = `Generator ${gen + 1}: ${generatorCosts[gen]} stars`;
    counterText.innerHTML = `Clicked ${counter.toFixed(1)} times!`;
    generators[gen] = round(generators[gen] + increase);
    generatorLevels[gen]++;
    upgrade.innerHTML = `Generator ${gen + 1}: ${generatorCosts[gen]} stars`;
    upgradeText.innerHTML = `${generators[gen].toFixed(1)} stars / sec (Level ${
      generatorLevels[gen]
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
  requestAnimationFrame(calculateFPS);
}

function round(num: number) {
  return Math.round(num * 10) / 10;
}

function loop() {
  loopTime++;
  buttonStatus(upgrade1, generatorCosts[0]);
  buttonStatus(upgrade2, generatorCosts[1]);
  buttonStatus(upgrade3, generatorCosts[2]);

  if (loopTime >= fps) {
    loopTime = 0;
    for (let i = 0; i < generators.length; i++) {
      counter = round(counter + generators[i]);
    }
    counterText.innerHTML = `Clicked ${counter.toFixed(1)} times!`;
  }
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(calculateFPS);
window.requestAnimationFrame(loop);
