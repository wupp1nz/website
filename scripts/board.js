const board = document.querySelector("board-members");

const BOARD_MEMBERS = [
  {
    name: "Marc Cruz",
    position: "diveristy quota",
    photo: "../assets/images/marc_cruz.jpg",
    media: [
      "https://www.linkedin.com/in/marc-cruz13/"
    ]
  },
  {
    name: "Diego Pimienta",
    position: "nerd #243",
    photo: "../assets/images/diego_pimienta.jpg",
    media: [
      "https://www.linkedin.com/in/diego-pimienta-b8152522b/"
    ]
  },
  {
    name: "Deric Kwok",
    position: "nerd #420",
    photo: "../assets/images/deric_kwok.jpg",
    media: [
      "https://linkedin.com/in/derickwok",
      "https://deric.app"
    ]
  },
  {
    name: "Neil Reyes",
    position: "nerd #69",
    photo: "../assets/images/neil_reyes.jpg"
  },
  {
    name: "Bryan Gonzalez",
    position: "nerd #1337",
    photo: "../assets/images/bryan_gonzalez.jpg"
  },
  {
    name: "Destiny Tsui",
    position: "diveristy quota #2",
    photo: "../assets/images/destiny_tsui.jpg"
  }
];

const MEDIA_ICONS = {
  "linkedin": "../assets/tokens/linkedin.svg",
  "website": "../assets/tokens/website.svg"
};

function createBoardMemberElement(name, position, photo, media) {

  const container = document.createElement("div");
  container.classList.add("container");

  const photoWrapper = document.createElement("div");
  photoWrapper.classList.add("photo-wrapper");
  photoWrapper.classList.add("gradient");

  const photoFrame = document.createElement("img");
  photoFrame.id = "board-photo"
  photoFrame.src = photo;

  const contentFrame = document.createElement("div");
  contentFrame.classList.add("content");

  const nameLabel = document.createElement("h3");
  nameLabel.innerText = name;

  const positonLabel = document.createElement("p");
  positonLabel.innerText = position;

  const mediaFrame = document.createElement("div");
  mediaFrame.classList.add("media-frame")
  media?.forEach((link) => {
    const icon = document.createElement("a");
    icon.href = link;
    icon.target = "_blank";
    icon.rel="noopener";

    console.log(link)

    const social = document.createElement("img");
    social.classList.add("social");
    if (link.includes("linkedin")) {
      social.src = MEDIA_ICONS["linkedin"];
    } else {
      social.src = MEDIA_ICONS["website"];
    }

    icon.appendChild(social);
    mediaFrame.appendChild(icon);
  });

  photoWrapper.appendChild(photoFrame);

  contentFrame.appendChild(nameLabel);
  contentFrame.appendChild(positonLabel);
  contentFrame.appendChild(mediaFrame);

  container.appendChild(photoWrapper);
  container.appendChild(contentFrame);
  return container;
}

BOARD_MEMBERS.forEach((info) => {
  const { name, photo, position, media } = info;
  const newMember = createBoardMemberElement(name, position, photo, media);
  board.appendChild(newMember);
});