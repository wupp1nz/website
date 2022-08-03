const SPREADSHEET_ID = "1V9EnPDW7JZFJf8ncFZgseljh59JvcO3Gc1bMRuh04hs"
const GOOGLE_KEY_TOKEN = "AIzaSyBcbBOtcmoCwJA7G34oUd5wdJHm_Q_tWsE";
const RANGE = "Responses";

const upcomingEventContainer = document.querySelector(".upcoming-events-container");
const pastEventContainer = document.querySelector(".past-events-container");

function createEvent(props) {
  const { title, startDate, endDate, location, description } = props;

  const startingDate = new Date(startDate).toLocaleDateString("en-US", { dateStyle: "full" });
  const startingTime = new Date(startDate).toLocaleTimeString("en-US", { hour: '2-digit', minute:'2-digit' });
  const endingTime = new Date(endDate).toLocaleTimeString("en-US", { hour: '2-digit', minute:'2-digit' });

  return `
    <section class="event">
      <h3 class="event-title">${title}</h3>
      <span class="event-date">${startingTime} - ${endingTime} | ${startingDate}</span>
      <span class="event-location">
        ${location.includes("http") ? `<a href="${location}">Zoom Meeting</a>` : `<span>${location}</span>`}
      </span>
      <p class="event-text">
        ${description}
      </p>
    </section> 
  `;
}

(async function() {
  try {
    const request = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${GOOGLE_KEY_TOKEN}`);
    const response = await request.json();
    const upcomingEventsCounter = 0;
    let fetchedPastEvents = "";

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
      if (endDate < currentTime) {
        upcomingEventContainer.innerHTML += createEvent(props);
        upcomingEventsCounter++;
      } else {
        fetchedPastEvents += createEvent(props);
      }
    });

    // After sorting all the past and upcoming events,
    // if there's no upcoming events, we'll display a message.
    if (upcomingEventsCounter == 0) {
      upcomingEventContainer.innerHTML = `
        <center>There's currently no upcoming events.</center>
      `;
    }
    
    // Puts the newest past events in the front.
    pastEventContainer.innerHTML = fetchedPastEvents + pastEventContainer.innerHTML;

  } catch(error) {
    upcomingEventContainer.innerHTML = `Failed to load events. (${error.message})`;
    console.log(error);
  }
})();