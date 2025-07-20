// Order tracking simulation
let step = 1;
let progressBar = document.getElementById("progress-bar");

function updateTracking() {
    if (step == 2) {
        document.getElementById("step2").style.background = "#FFDE59";
        progressBar.value = 50;
    } else if (step == 3) {
        document.getElementById("step3").style.background = "#FFDE59";
        progressBar.value = 75;
    } else if (step == 4) {
        document.getElementById("step4").style.background = "#FFDE59";
        progressBar.value = 100;
    } else {
        return;
    }
    step++;
}

// Update order status every 10 seconds
setInterval(updateTracking, 10000);
