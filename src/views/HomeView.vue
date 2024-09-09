<template>
  <div class="home">

    <div class="landing">

      <div class="landing-image image">
        <h1>Home</h1>
        <div class="landing-content">
        <h1 id="welcoming">Welcome to FortuneTrack,</h1>
        <p>Predict trends in Retail, Technology, Food & Beverages, and Healthcare</p>
        <div class="button-container">
          <button class="cta-button">Get Started</button>
          <button class="cta-button secondary">Learn More</button>
        </div>
      </div>
      </div>
    </div>

    <section class="specializations">
      <h2 id="welcoming">Our Specializations:</h2>
      <ul id="sp">
        <li>Leveraging the latest data trends to drive actionable business insights.</li>
        <li>Utilizing real-time data from Google Trends and X (Twitter) for accurate forecasts.</li>
        <li>Transforming raw data into meaningful visualizations for strategic decision-making.</li>
        <li>Providing businesses with timely predictions to optimize product sales and market strategies.</li>
      </ul>
    </section>
  </div>
</template>

<script>
</script>

<style scoped>
.home {
  color: #ffffff;
  font-family: Arial, sans-serif;
}

.landing {
  display: flex;
  height: 60vh;
  
}
.image{
  background-image: url('https://i.postimg.cc/wvGrsQYB/Header.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.landing-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  margin-top: 5%;
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 20px;
}

.landing-image {
  flex: 1;
  overflow: hidden;
}

.landing-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.button-container {
  display: flex;
  gap: 20px;
}

.cta-button {
  background-color: white;
  color: #4169E1;
  border: 2px solid #4169E1;
  padding: 10px 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 1em;
  cursor: pointer;
  border-radius: 40%;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #4169E1;
  color: black;
  border: solid black;
}

.cta-button.secondary {
  background-color: white;
  border: 2px solid #4169E1;
}

.cta-button.secondary:hover {
  background-color: #4169E1;
  border: solid black;
}

.specializations {
  background-color: #0a2472;
  padding: 40px 20px;
  text-align: center;
}

.specializations h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.specializations ul {
  list-style-type: none;
  padding: 0;
}

.specializations li {
  font-size: 1.1em;
  margin-bottom: 15px;
}

#welcoming{
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 50px;
}

h1{
  margin-top: 1%;
  margin: 1%;
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
}

p, #sp{
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
}

@media (max-width: 768px) {
  .landing {
    flex-direction: column;
    height: auto;
  }

  .landing-content {
    padding: 40px 20px;
  }

  .landing h1 {
    font-size: 2em;
  }

  .landing p {
    font-size: 1em;
  }

  .button-container {
    flex-direction: column;
  }
}
</style>