const clicks_label = document.querySelector("#clicks-label");
const clicks_button = document.querySelector("#clicks-button");

function increaseGlobalClicks(amount) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({amount: amount})
    };
    fetch("/increase_clicks", options).then(() => {})
}

async function getGlobalClicks() {
    let res = await fetch("/num_clicks");
    return (await res.json()).amount;
}

// Keep track of number of clicks since last server upate
let local_clicks = 0;
clicks_button.addEventListener("click", ev => {
    local_clicks++;
    clicks_label.textContent = parseInt(clicks_label.textContent) + 1;
});

setInterval(() => {
    getGlobalClicks().then(num_clicks => {
        clicks_label.textContent = num_clicks + local_clicks;
        increaseGlobalClicks(local_clicks);
        local_clicks = 0;
    });
}, 1000);