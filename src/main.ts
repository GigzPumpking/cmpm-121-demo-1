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

let counter: number = 0;

const counterText = document.createElement("p");
counterText.innerHTML = `Clicked ${counter} times!`;
app.append(counterText);

button.addEventListener("click", function () {
  counter++;
  counterText.innerHTML = `Clicked ${counter} times!`;
});
