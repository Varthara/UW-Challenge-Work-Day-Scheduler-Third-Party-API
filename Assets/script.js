var currentDayid = $('#currentDay');
var currentTimeid = $('#currentTime');
var date = moment().format("dddd, MMMM Do");
var hour = moment().format("HH");
var textArea;


// Function to display current date on top of page. Function loads on start
function clock() {
    currentDayid.text(date);
    // Above sets date to today, below formats time display
    currentTimeid.text(moment().format("h:mm:ss a"));
    timerInterval = setInterval(function() {
        currentTimeid.text(moment().format("h:mm:ss a"));
    }, 1000);
}


// startUp function which sets color to time cards. 
function startUp() {
    // For loop to allow color check to apply to each time slot
    for (let i = 9; i < 18; i++) {
        var row = (document.getElementById(i));
        textArea = row.children[1];
        var stored = localStorage.getItem(i);
        // Local storage for saved items
        if (stored != null) {
            textArea.value = stored;
        }
        // Assigns colors to time slots based on provided CSS
        if (parseInt(hour) > parseInt(row.id)) {
            textArea.classList.add("past");
        } else if (parseInt(hour) == parseInt(row.id)) {
            textArea.classList.add("present");
        } else {
            textArea.classList.add("future");
        }
    }
}

// Function for storing text in local storage 
function saveFunction(_this) {
    // Set's text to "saved" after saving, reverts to "save" after short period of time
    this.textContent = "Saved";
    setTimeout(() => {
        this.textContent = "Save"
    }, 800);
    var appointment = this.parentNode.id;
    textArea = document.getElementById(appointment).children[1];
    // Saves text in local storage 
    localStorage.setItem(appointment, textArea.value);
}

// Event listener to call saveFunction on click of save button
document.querySelectorAll(".saveBtn").forEach(function(btn) {
    btn.addEventListener("click", saveFunction)
})

// Functions that load on page start
startUp();
clock();