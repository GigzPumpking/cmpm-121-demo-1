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
let loopFrequency: number = 60;
let numUpgrades: number = 1;

// Buttons

const counterText = document.createElement("p");
counterText.innerHTML = `Clicked ${counter} times!`;
app.append(counterText);

button.addEventListener("click", function () {
  counter++;
  counterText.innerHTML = `Clicked ${counter} times!`;
});

const upgrade = document.createElement("button");
upgrade.innerHTML = "Upgrade";
app.append(upgrade);

upgrade.addEventListener("click", function () {
  counter -= 10;
  numUpgrades++;
  counterText.innerHTML = `Clicked ${counter} times!`;
  loopFrequency = 60 / numUpgrades;
});

upgrade.disabled = true;

function loop() {
  loopTime++;
  if (counter >= 10) {
    upgrade.disabled = false;
  } else {
    upgrade.disabled = true;
  }

  if (loopTime >= loopFrequency) {
    loopTime = 0;
    counter++;
    counterText.innerHTML = `Clicked ${counter} times!`;
  }
  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
