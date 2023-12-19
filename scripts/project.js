const projects = document.querySelectorAll("project");

projects.forEach((project) => {
  // stores a copy of the static children.
  const children = [...project.children];
  project.innerHTML = "";

  project.classList.add("block");

  const leftFrame = document.createElement("div");
  leftFrame.classList.add("left");

  const titleLabel = document.createElement("h1");
  titleLabel.innerText = project.getAttribute("name");

  const descriptionLabel = document.createElement("p");
  descriptionLabel.innerText = project.getAttribute("description");

  const textButton = document.createElement("a");
  textButton.setAttribute("target", "_self");
  textButton.href = project.getAttribute("href");

  const textLabel = document.createElement("span");
  textLabel.innerText = "Learn more";

  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  arrow.setAttribute("fill", "white");
  arrow.setAttribute("width", "10");
  arrow.setAttribute("height", "16");
  arrow.setAttribute("viewBox", "0 0 10 16");

  const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  arrowPath.setAttribute("d", "M1.93286 16L9.93286 8L1.93286 0L0.0672302 1.8672L6.20009 8.00006L0.0672302 14.1329L1.93286 16Z");

  textButton.appendChild(textLabel);
  arrow.appendChild(arrowPath);
  textButton.appendChild(arrow);

  const rightFrame = document.createElement("div");
  rightFrame.classList.add("right");
  children.forEach((element) => {
    rightFrame.append(element);
  });

  leftFrame.appendChild(titleLabel);
  leftFrame.appendChild(descriptionLabel);
  leftFrame.appendChild(textButton);

  project.appendChild(leftFrame);
  project.appendChild(rightFrame);
});