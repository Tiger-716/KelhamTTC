const bookingForm = document.getElementById("booking-form");
const closeBtn = document.getElementById("close");
const sessionText = document.getElementById("session-txt");
const bookingBtn = document.getElementById("booking-btn");
const slotText = document.getElementById("slot");
const bookingInput = document.getElementById("booking-input");
const bookedText = document.getElementById("booked");
const d = new Date();

let today = d.getDay();
let hh = d.getHours();
let mm = d.getMinutes();
let ss = d.getSeconds();
let vacancy = 12;

bookingBtn.addEventListener("click", () => {
  if (vacancy > 0) {
    vacancy--;
    slotText.innerHTML = `Slot Available: ${vacancy}`;
    localStorage.setItem(`${Math.abs(vacancy-12)}`, bookingInput.value);
    updateBooked();
  }
  else {
    alert("This session is fully booked");
  }
  bookingInput.value = "";
});

closeBtn.addEventListener("click", () => {
  bookingForm.style.display = "none";
});

function openForm(day, time) {
  sessionText.innerHTML = `Session Time: ${day} ${time} ${today} ${hh} ${mm} ${ss}`;
  slotText.innerHTML = `Slot Available: ${vacancy}`;
  bookingForm.style.display = "block";
  updateBooked()
}

function updateBooked() {
  for (let i = 0; i < vacancy; i++) {
    if (localStorage.getItem(`${i}`)) {
      bookedText.innerHTML += localStorage.getItem(`${i}`)
    }
  }
}

// https://www.youtube.com/watch?v=cRwpTv33Z_g google sheet
// https://www.youtube.com/watch?v=XHokFQeQ6Lk json

// fetch('https://tiger-716.github.io/KelhamTTC/timetable.json',
//   {method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(session)}).then(res => res.json()).then(data => {console.log('succeed');});


// get data from google sheet
const sheetId = "1Yhe8juGUVuoCZiRECcwdjnK36O5DlUfMES8oauzdB0w";
const sheetName = encodeURIComponent("TimeTable");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

fetch(sheetURL).then((res) => res.text()).then((csvText) => {let sheetObjects = csvToObjects(csvText); console.log(sheetObjects)})

function csvToObjects(csv) {
  const csvRows = csv.split("\n");
  const propertyNames = csvSplit(csvRows[0]);
  let objects = [];
  for (let i = 1, max = csvRows.length; i < max; i++) {
    let thisObject = {};
    let row = csvSplit(csvRows[i]);
    for (let j = 0, max = row.length; j < max; j++) {
      thisObject[propertyNames[j]] = row[j];
    }
    objects.push(thisObject);
  }
  return objects;
}

function csvSplit(row) {
  return row.split(",").map((val) => val.substring(1, val.length - 1));
}