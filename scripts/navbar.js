const navbar = document.querySelector("nav");

const listings = [
  {
    name: "events",
    src: "../events",
    newTab: false
  },
  {
    name: "projects",
    src: "../projects",
    newTab: false
  },
  {
    name: "about",
    src: "../about",
    newTab: false
  },
  {
    name: "join",
    src: "https://forms.gle/CNJHpom33kJjfSFm6",
    newTab: true
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
  const { name, src, newTab } = list;
  const pathname = window.location.pathname.slice(1, -1);
  const element = document.createElement("li");
  const text = document.createTextNode(name);
  const anchor = document.createElement("a");
  anchor.href = src;

  if (newTab) {
    anchor.target = "_blank";
    anchor.rel = "noopener";
  }

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