let daycounter = 1;
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var currentDate = new Date(market[daycounter].date);

$(function () {
  updateDisplay();

  $("#btnNext").on("click", function nextDay() {
    if (daycounter + 1 < market.length) {
      daycounter++;
      updateDisplay();
    } else {
      alert("No more days available.");
    }
  });

  let timer = null;
  $("#btnPlay").on("click", function () {
    if (timer === null) {
      timer = setInterval(nextDay, 100);
    } else {
      clearInterval(timer);
      timer = null;
    }
  });

});

// Update Display
function updateDisplay() {
  currentDate = new Date(market[daycounter].date);
  var month = currentDate.getMonth();
  var day = currentDate.getDate();
  var year = currentDate.getFullYear();

  var currentDate = `${day} ${months[month - 1]} ${year}`;
  var currentDay = `Day ${daycounter}`;

  $(".date").text(currentDate);
  $(".day").text(currentDay);
}

