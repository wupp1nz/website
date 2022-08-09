const navbar = document.querySelector("nav");

const listings = [
  {
    name: "events",
    src: "../events"
  },
  {
    name: "projects",
    src: "../projects"
  },
  {
    name: "about",
    src: "../about"
  },
  {
    name: "join",
    src: "../join"
  }
];

const leftNav = document.createElement("div");
leftNav.classList.add("left");

const logoAnchor = document.createElement("a");
logoAnchor.href = "/";

const logo = document.createElement("img");
logo.id = "sea-logo";
logo.src = "../../assets/images/sealogo.png";

const rightNav = document.createElement("ul");
rightNav.classList.add("right");

listings.forEach((list) => {
  const { name, src } = list;
  const pathname = window.location.pathname.slice(1, -1);
  const element = document.createElement("li");
  const text = document.createTextNode(name);
  const anchor = document.createElement("a");
  anchor.href = src;

  if (src.slice(3) === pathname) {
    element.setAttribute("id", "active");
  }

  anchor.appendChild(text);
  element.appendChild(anchor);
  rightNav.appendChild(element);
});

logoAnchor.appendChild(logo);
leftNav.appendChild(logoAnchor);
navbar.appendChild(leftNav);
navbar.appendChild(rightNav);