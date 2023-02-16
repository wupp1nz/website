
const footer = document.querySelector("footer");

const SOCIALS = [
  {
    name: "instagram",
    url: "https://www.instagram.com/cpp.sea/"
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/company/cpp-sea"
  },
  {
    name: "github",
    url: "https://github.com/cppsea",
  },
  {
    name: "discord",
    url: "https://discord.gg/3FJNHyJ6P6"
  }
];

const footerContainer = document.createElement("div");
footerContainer.id = "footer-container"

const branding = document.createElement("div");
branding.id = "branding";

const footerLogo = document.createElement("img");
footerLogo.src = "../assets/images/full-logo.png";

const footerLogoContainer = document.createElement("a");
footerLogoContainer.href = "/";

branding.appendChild(footerLogoContainer);
footerLogoContainer.appendChild(footerLogo);

const social = document.createElement("div");
social.id = "social";

const socialHeader = document.createElement("h3");
socialHeader.innerText = "Social"

const socialListContainer = document.createElement("ul");

SOCIALS.forEach((props) => {
  const { name, url } = props;
  const element = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.href = url;
  const text = document.createTextNode(name);
  anchor.append(text);
  element.appendChild(anchor);
  socialListContainer.appendChild(element);
});

social.appendChild(socialHeader);
social.appendChild(socialListContainer);

const routes = document.createElement("div");
routes.id = "routes";

const routesHeader = document.createElement("h3");
routesHeader.innerText = "More";

const links = document.createElement("ul");

routes.appendChild(routesHeader);

listings.forEach((list) => {
  const { name, src } = list;
  const element = document.createElement("li");
  const anchor = document.createElement("a");
  anchor.href = src;
  const text = document.createTextNode(name);
  anchor.appendChild(text);
  element.appendChild(anchor);
  links.append(element);
});

routes.appendChild(links);

footerContainer.appendChild(branding);
footerContainer.appendChild(social);
footerContainer.appendChild(routes);

const copyright = document.createElement("div");
copyright.id = "copyright"
copyright.innerText = "© 2022 SOFTWARE ENGINEERING ASSOCIATION AT CAL POLY POMONA · ALL RIGHTS RESERVED"

footer.appendChild(footerContainer);
footer.appendChild(copyright);