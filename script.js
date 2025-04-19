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