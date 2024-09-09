window.onload = function() {
  const counterElement = document.getElementById("view-count");

  async function updateCounter() {
      try {
          let response = await fetch("https://5rumd32fgnfmqfbh4ira2gycsa0ermcu.lambda-url.us-east-1.on.aws/");
          
          // Check if the response was successful
          if (!response.ok) {
              throw new Error(`Network response was not ok. Status: ${response.status}`);
          }
          
          let data = await response.json();
          
          // Debugging: log the fetched data
          console.log('Fetched data:', data);
          
          // Check if 'Views' is present in the data
          if (data && 'Views' in data) {
              console.log('Views found:', data.Views);
              counterElement.innerHTML = `${data.Views}`;
          } else {
              console.warn('Views attribute is missing in the response data');
              counterElement.innerHTML = 'Error: Views data missing';
          }
      } catch (error) {
          // Log errors to the console
          console.error("Error fetching view count:", error);
          counterElement.innerHTML = 'Error fetching view count';
      }
  }

  function scrollToSection() {
      document.getElementById("documentation").scrollIntoView({ behavior: "smooth" });
  }

  // Initialize the view count on page load
  updateCounter();
};
