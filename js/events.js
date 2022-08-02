const SPREADSHEET_ID = "1V9EnPDW7JZFJf8ncFZgseljh59JvcO3Gc1bMRuh04hs"
const RANGE = "Responses";
const GOOGLE_KEY_TOKEN = "AIzaSyBcbBOtcmoCwJA7G34oUd5wdJHm_Q_tWsE";

const container = document.querySelector(".upcoming-events-container");

function createEvent(props) {
  const [timestamp, title, startDate, endDate, location, description] = props;

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

    const events = response.values.slice(1);

    container.innerHTML = "";
    events.forEach(props => {
      container.innerHTML += createEvent(props);
    });

  } catch(error) {
    container.innerHTML = `Failed to load events. (${error.message})`;
    console.log(error);
  }
})();