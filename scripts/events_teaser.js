const SPREADSHEET_ID = "1V9EnPDW7JZFJf8ncFZgseljh59JvcO3Gc1bMRuh04hs"
const GOOGLE_KEY_TOKEN = "AIzaSyBcbBOtcmoCwJA7G34oUd5wdJHm_Q_tWsE";
const RANGE = "Events";

const upcomingEventContainer = document.querySelector(".event-container .right .events");

function createEvent(props) {
  const { title, startDate, endDate, location, description, link1, link2 } = props;

  const startingDate = new Date(startDate).toLocaleDateString("en-US", { day: "numeric", "month":"numeric" });
  const startingTime = new Date(startDate).toLocaleTimeString("en-US", { hour: '2-digit', minute:'2-digit' });
  const endingTime = new Date(endDate).toLocaleTimeString("en-US", { hour: '2-digit', minute:'2-digit' });

  const card = document.createElement("div");
  card.classList.add("card");

  const isLocationURL = location.includes("http");

  card.innerHTML = `
    <div class="date gradient">
      <h1>${startingDate}</h1>
    </div>
    <div class="content">
      <span class="darken-text">${!isLocationURL && location}${!isLocationURL && " ・ "}${startingTime} - ${endingTime} </span>
      <h1>${title}</h1>
      <p class="darken-text">${description}</p>
    </div>
  `;

  return card;
}

(async function() {
  try {
    const request = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${GOOGLE_KEY_TOKEN}`);
    const response = await request.json();

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
    payload.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());

    // Clears the loading message.
    upcomingEventContainer.innerHTML = "";
    payload.forEach(props => {
      const { endDate } = props;

      const currentTime = new Date().getTime();
      const endingDate = new Date(endDate).getTime();

      const component = createEvent(props);
      if (endingDate > currentTime) {
        upcomingEventContainer.appendChild(component);
      } else {
        pastEventContainer.appendChild(component);
      }
    });

  } catch(error) {
    upcomingEventContainer.innerHTML = `Failed to load events. (${error.message})`;
    console.log(error);
  }
})();