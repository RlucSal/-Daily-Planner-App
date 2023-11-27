$(document).ready(function () {
    // Function to create the date and time for the header
    function displayDate() {
        $("#currentDay").html(dayjs().format("DD MMMM YYYY h:mm:ss a"));
    }
    setInterval(displayDate, 1000);

    // Save Button Click Event
    $(".container").on("click", ".saveBtn", function () {
        var input = $(this).closest('.row').find('.form-control').val();
        var whichHour = $(this).closest('.row').find('.form-control').attr('id');
        localStorage.setItem(whichHour, input);
    });

    $(".container").on("click", ".deleteBtn", function () {
        var hourId = $(this).closest('.row').find('.form-control').attr('id');
        
        // Clear the value of the input field
        $(this).closest('.row').find('.form-control').val('');
        
        // Remove the item from localStorage
        localStorage.removeItem(hourId);
    });

    // Color Coding Time Blocks
    var updateColors = function () {
        var currentHour = dayjs().hour();
        $(".time-block").each(function () {
            var calendarHour = parseInt($(this).children('.form-control').attr("id"));
            $(this).toggleClass("past", calendarHour < currentHour);
            $(this).toggleClass("present", calendarHour === currentHour);
            $(this).toggleClass("future", calendarHour > currentHour);
            $(this).children('.form-control').prop( calendarHour < currentHour);
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

    // Add and Delete Items
    $(".container").on("click", ".addBtn", function () {
        var newInput = $("<input>").addClass("form-control");
        var newBtn = $("<button>").addClass("btn btn-primary saveBtn").text("Save");

        var newRow = $("<div>").addClass("row");
        var newHourCol = $("<div>").addClass("col-md-1 hour").text("New Item");
        var newTimeBlockCol = $("<div>").addClass("col-md-10 time-block").append(newInput);
        var newSaveBtnCol = $("<div>").addClass("col-md-1").append(newBtn);

        newRow.append(newHourCol, newTimeBlockCol, newSaveBtnCol);
        $(".container").append(newRow);
    });

});
