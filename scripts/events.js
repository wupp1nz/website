const SPREADSHEET_ID = "1V9EnPDW7JZFJf8ncFZgseljh59JvcO3Gc1bMRuh04hs"
const GOOGLE_KEY_TOKEN = "AIzaSyBcbBOtcmoCwJA7G34oUd5wdJHm_Q_tWsE";
const RANGE = "Responses";

const upcomingEventContainer = document.querySelector(".upcoming-events .events");
const pastEventContainer = document.querySelector(".past-events .events");

function createEvent(props) {
  const { title, startDate, endDate, location, description, link1, link2 } = props;

  const startingDate = new Date(startDate).toLocaleDateString("en-US", { dateStyle: "full" });
  const startingTime = new Date(startDate).toLocaleTimeString("en-US", { hour: '2-digit', minute:'2-digit' });
  const endingTime = new Date(endDate).toLocaleTimeString("en-US", { hour: '2-digit', minute:'2-digit' });

  const isLocationURL = location.includes("http");
  const hasLink1 = link1 !== "None";
  const hasLink2 = link2 !== "None";

  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("block");

  const header = document.createElement("h1");
  header.innerText = title;

  const timeElement = document.createElement("div");
  timeElement.innerText = `${startingTime} - ${endingTime} ・ ${startingDate}`;

  const descElement = document.createElement("p");
  descElement.innerText = description;

  card.appendChild(header);
  card.appendChild(timeElement);

  const anchors = document.createElement("div");
  anchors.classList.add("anchors");

  const resources = document.createElement("div");
  resources.classList.add("resources");

  const anchor = document.createElement("a");
  if (isLocationURL) {
    anchor.classList.add("btn-arrow");
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.href = location;
    anchor.innerHTML = `
      <span>Join Call</span>
      <svg width="10" height="16" viewBox="0 0 10 16">
        <path d="M1.93286 16L9.93286 8L1.93286 0L0.0672302 1.8672L6.20009 8.00006L0.0672302 14.1329L1.93286 16Z"/>
      </svg>
    `;
  } else {
    const locationElement = document.createElement("div");
    locationElement.innerHTML = location;
    card.appendChild(locationElement);
  }

  anchors.appendChild(anchor);
  anchors.appendChild(resources);

  if (hasLink1) {
    const slides = document.createElement("a");
    slides.href = link1;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    slides.innerText = "slides";
    resources.appendChild(slides);
  }

  if (hasLink2) {
    const docs = document.createElement("a");
    docs.href = link2;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    docs.innerText = "docs";
    resources.appendChild(docs);
  }

  card.appendChild(descElement);
  card.appendChild(anchors);

  return card;
}

(async function() {
  try {
    const request = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${GOOGLE_KEY_TOKEN}`);
    const response = await request.json();
    let hasNewEvents = false;

    const header = response.values[0];
    const events = response.values.slice(1);
    const payload = [];
    for (let row = 0; row < events.length; row++) {
      const map = {};
      for (let col = 0; col < events[0].length; col++) {
        // Normalize the keys so it's camelCase.
        let key = header[col].replace(/\s+/, "");
        key = key.charAt(0).toLowerCase() + key.slice(1);
        map[key] = events[row][col];
      }
      payload.push(map);
    }

    // Sorts all the fetched events by the end date.
    payload.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());

    // Clears the loading message.
    upcomingEventContainer.innerHTML = "";
    payload.forEach(props => {
      const { endDate } = props;

      const currentTime = new Date().getTime();
      const endingDate = new Date(endDate).getTime();

      const component = createEvent(props);
      if (endingDate > currentTime) {
        upcomingEventContainer.appendChild(component);
        hasNewEvents = true;
      } else {
        pastEventContainer.appendChild(component);
      }
    });

    // After sorting all the past and upcoming events,
    // if there's no upcoming events, we'll display a message.
    if (!hasNewEvents) {
      upcomingEventContainer.innerHTML = `
        <center>There's currently no upcoming events.</center>
      `;
    }
    
  } catch(error) {
    upcomingEventContainer.innerHTML = `Failed to load events. (${error.message})`;
    console.log(error);
  }
})();