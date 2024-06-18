<h1 align="center">
    <img alt="Desweather" title="Desweather" src=".github/logo.svg" width="220px" />
</h1>

<p align="center">
  <a href="#-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-run">How to run</a>
</p>

<p align="center">
  <img alt="Desweather" src=".github/desweather.png" width="100%">
</p>

## ⛅ About

Desweather is your go-to app for precise and timely climate information. Whether you're preparing for a vacation, commuting to work, or deciding what to wear, Desweather offers the latest weather forecasts tailored to your location and beyond.

## 🚀 Project

🌟 Situation:

People often need quick, reliable weather updates to make informed decisions about their daily activities. The challenge was to create a user-friendly app that delivers precise, real-time weather information with an intuitive interface.

🎯 Task:

Develop a weather application that:

- Offers accurate and timely weather forecasts.
- Is easy to use with a clean, intuitive design.
- Supports local and global weather data.
- Integrates interactive maps for visual weather representation.

🚀 Action:

To achieve these goals, I employed the following actions:

- Design & User Experience: Designed a sleek, intuitive UI using Sass for custom styling, ensuring a consistent look and feel across all devices.
- Interactive Maps: Integrated Leaflet to provide dynamic, interactive weather maps, allowing users to visualize weather conditions in different locations.
- Technology Stack: Chose React.js with Next.js for server-side rendering and optimal performance, and TypeScript for type safety and robust code.
- API Integration: Utilized Axios to fetch real-time weather data from various APIs, ensuring users receive accurate and up-to-date forecasts.
- Testing & Optimization: Implemented end-to-end testing with Cypress to ensure the app's reliability and smooth functionality.

🏆Result:

Desweather successfully delivered:

- Accurate Weather Updates: Users received precise and timely weather information, aiding their daily decision-making.
- Enhanced User Engagement: The intuitive design and interactive maps led to increased user satisfaction and engagement.
- Positive Feedback: The app was praised for its clean interface and reliability, boosting user trust and retention.
- Scalable and Maintainable Codebase: The use of React.js with Next.js and TypeScript ensured the app was easy to maintain and scalable for future enhancements.

Explore Desweather for reliable weather forecasts and a smooth user experience:

<h3 align="center"><a href="https://desweather.vercel.app/" target="_blank">https://desweather.vercel.app/</a> 🚀🌐</h3>

## 🔧 Technologies

Throughout these projects, I have utilized a variety of technologies and tools, including:

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Leaflet](https://react-leaflet.js.org/)
- [Cypress](https://www.cypress.io/)
- [Axios](https://axios-http.com/)
- [Sass](https://sass-lang.com/)

## 😊 How to run

Before starting, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed on your machine.

```sh
- Clone this repo:
$ git clone https://github.com/marcelopajr/desweather.git

- Enter directory:
$ cd desweather

- Install dependencies:
$ npm install

- Launch the app:
$ npm run dev

- To run tests with Cypress:
$ npm run cy:open
```

⚠️ You also need to create an account at [OpenWeather](https://openweathermap.org/api) to get an api key access.<br/>
After that, create a <b>.env.local</b> file on project root. and add the following content:

```sh
NEXT_PUBLIC_OPEN_WEATHER_BASE_URL=https://api.openweathermap.org
NEXT_PUBLIC_OPEN_WEATHER_APIKEY=YOUR_API_KEY
```

Have fun!
