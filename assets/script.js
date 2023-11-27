$(document).ready(function () {
    // Function to create the date and time for the header
    function displayDate() {
      $("#currentDay").html(dayjs().format("DD MMMM YYYY"));
    }
    setInterval(displayDate, 1000);
});

