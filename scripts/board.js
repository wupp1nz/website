const board = document.querySelector("board-members");

function createBoardMemberElement(name, position, media) {

  const container = document.createElement("div");
  container.classList.add("container");

  const nameLabel = document.createElement("h3");
  nameLabel.innerText = name;

  const positonLabel = document.createElement("p");
  positonLabel.innerText = position;

  const mediaContainer = document.createElement("div");

  container.appendChild(name);
  return container;
}