const boards = document.querySelectorAll("board");

const MEDIA_ICONS = {
  "linkedin": "../assets/tokens/linkedin.svg",
  "website": "../assets/tokens/website.svg"
};

function createMember(parent, props) {
  const { name, position, photo, media } = props;

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
    if (!link) return;

    const icon = document.createElement("a");
    icon.href = link;
    icon.target = "_blank";
    icon.rel="noopener";

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

  parent.appendChild(photoWrapper);
  parent.appendChild(contentFrame);
}

boards.forEach((board) => {
  const name = board.getAttribute("name");
  const position = board.getAttribute("position");
  const photo = board.getAttribute("avatar");
  const linkedin = board.getAttribute("linkedin");
  const website = board.getAttribute("website");

  createMember(board, {
    name,
    position,
    photo,
    media: [linkedin, website]
  })
});