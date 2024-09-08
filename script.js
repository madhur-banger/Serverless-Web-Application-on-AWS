const counterElement = document.getElementById("view-count");

async function updateCounter() {
    try {
        let response = await fetch(
            "https://re6sptiewpupr6rh4q7zucy3a40qxsvr.lambda-url.us-east-1.on.aws/"
        );
        let data = await response.json();
        
        // Since 'Views' is inside 'body', parse 'body' if it's a string
        if (typeof data.body === 'string') {
            data = JSON.parse(data.body);
        }
        
        // Update the views count
        if (data.Views !== undefined) {
            counterElement.innerHTML = `${data.Views}`;
        } else {
            counterElement.innerHTML = "Error: No Views";
        }
    } catch (error) {
        console.error("Error fetching view count:", error);
        counterElement.innerHTML = "Error fetching views";
    }
}

updateCounter();