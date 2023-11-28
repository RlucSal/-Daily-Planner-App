// This function is called when the DOM is ready to be manipulated. It ensures that your code will not run until the DOM is fully loaded.
$(document).ready(function () {
    // Function to create the date and time for the header
    function displayDate() {
        $("#currentDay").html(dayjs().format("DD MMMM YYYY h:mm:ss"));
    }
    setInterval(displayDate, 1000);

    // Save Button Click Event
    $(".container").on("click", ".saveBtn", function () {
        var input = $(this).closest('.row').find('.form-control').val();
        var whichHourS = $(this).closest('.row').find('.form-control').attr('id');
        localStorage.setItem(whichHourS, input);
    });

     // Delete Button Click Event
    $(".container").on("click", ".deleteBtn", function () {
        var whichHourId = $(this).closest('.row').find('.form-control').attr('id');
        
        // Clear the value of the input field
        $(this).closest('.row').find('.form-control').val('');
        
        // Remove the item from localStorage
        localStorage.removeItem(whichHourId);
    });

    // Color Coding Time Blocks
    var updateColors = function () {
        var currentHour = dayjs().hour();
        $(".time-block").each(function () {
            var calendarHour = parseInt($(this).children('.form-control').attr("id"));
            $(this).toggleClass("past", calendarHour < currentHour);
            $(this).toggleClass("present", calendarHour === currentHour);
            $(this).toggleClass("future", calendarHour > currentHour);
        });
    };

    // Retrieve and Display Stored Data
    $(".time-block").each(function () {
        var hourId = $(this).children('.form-control').attr("id");
        $(this).children('.form-control').val(localStorage.getItem(hourId));
    });

    // Update colors and current time every minute
    setInterval(updateColors, 60000);
    updateColors();

});
