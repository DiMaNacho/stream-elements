const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const tiempo = urlParams.get("tiempo") || 5;
const $el = document.querySelector(".sign");
const current_time = Date.parse(new Date());
const deadline = new Date(current_time + tiempo * 60 * 1000);

function time_remaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes < 10 ? "0" + minutes : minutes,
    seconds: seconds < 10 ? "0" + seconds : seconds,
  };
}
function run_clock(id, endtime) {
  function update_clock() {
    var t = time_remaining(endtime);
    $el.innerHTML = `${t.minutes}:${t.seconds}`;

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  update_clock(); // run function once at first to avoid delay
  var timeinterval = setInterval(update_clock, 1000);
}
run_clock("clockdiv", deadline);
