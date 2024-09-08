const counterElement = document.getElementById("view-count");

async function updateCounter() {
    try {
        let response = await fetch(
            "https://re6sptiewpupr6rh4q7zucy3a40qxsvr.lambda-url.us-east-1.on.aws/"
        );
        let data = await response.json();
        counterElement.innerHTML = `${data.Views}`;
    } catch (error) {
        console.error("Error fetching view count:", error);
    }
}

function scrollToSection() {
    document.getElementById("documentation").scrollIntoView({ behavior: "smooth" });
}

updateCounter();
