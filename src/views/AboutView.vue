<template>
  <div class="about">
    <h1>About</h1>
    <section class="about-content">
      <p>
    Welcome to <strong>FortuneTrack</strong>, a state-of-the-art predictive analytics platform meticulously crafted by me, Simanye Somdaka. Designed to empower businesses and individuals, this innovative tool provides actionable insights across key industry sectors, enabling smarter decisions and strategic foresight.<br> 
    <br>
    Built on the powerful MEVN stack (MySQL, Express.js, Vue.js, and Node.js), FortuneTrack offers a seamless and user-friendly experience for tracking and forecasting trends in Retail, Technology, Food & Beverages, and Healthcare. By analyzing data from the top three companies driving these sectors in the NYSE and NASDAQ, this platform delivers unparalleled insights across global markets.
</p>

<h2>My Mission</h2>

<p>
     To equip businesses along analytical individuals with precise, data-driven predictions, empowering them to optimize strategies and unlock their full potential. Leveraging real-time data from Alpha Vantage, FortuneTrack provides a holistic view of market dynamics and consumer behavior, transforming raw data into actionable intelligence.
</p>

    </section>
    <br>
    <section class="founder-image">
      <h2>Meet The Man Behind The Idea</h2>
      <img src="https://i.postimg.cc/G3qqjxw8/IMG-1675202806226.jpg" alt="Simanye Somdaka" />
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0)
  },
}
</script>

<style scoped>
.about {
  color: #ffffff;
  font-family: Arial, sans-serif;
  background-color: #000080;
}

.about-content h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 30px;
}

.about-content p {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  color: white;
  font-size: 20px;
  line-height: 1.5;
  text-align: left;
  padding: 1%;
}

.founder-image {
  text-align: center;
  padding-bottom: 2%;
}

.founder-image h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.founder-image img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1{
  padding-top: 1%;
  padding-left: 1%;
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
}
h2{
  font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: white;
    font-size: 30px;
    text-align: center;
}
span {
  font-family: 'Montserrat', sans-serif;
    font-weight: 900; 
    color: white;
    font-size: 30px;
}
</style>