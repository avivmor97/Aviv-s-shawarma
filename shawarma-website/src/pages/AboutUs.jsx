import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, Legend, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'

import avivImage from '../assets/images/aviv.jpeg'

ChartJS.register(CategoryScale, LinearScale, Tooltip, Legend, BarElement)

export const AboutUs = () => {
  const shawarmaLoveData = {
    labels: ['Love Shawarma', 'Don’t Love Shawarma'],
    datasets: [
      {
        data: [72, 28],
        backgroundColor: ['#ff6600', '#cccccc'],
      },
    ],
  }

  const happinessData = {
    labels: ['Happier', 'Neutral'],
    datasets: [
      {
        data: [95, 5],
        backgroundColor: ['#ffcc00', '#cccccc'],
      },
    ],
  }

  const extrasData = {
    labels: ['Pickles', 'Onion', 'Tahini', 'Amba', 'Salad', 'Eggplants', 'Parsley', 'Hummus'],
    datasets: [
      {
        data: [20, 15, 30, 10, 12, 8, 5, 25],
        backgroundColor: ['#ff6600', '#ffcc00', '#00ccff', '#66cc33', '#ff66cc', '#9933cc', '#3366cc', '#ffcc33'],
      },
    ],
  }

  return (
    <section className="about-us">
      <div className="story">
        <img src={avivImage} alt="Aviv Mor" className="founder-image" />
        <div className="text">
          <h1>About ShawarmBoutique</h1>
          <p>
            ShawarmBoutique was founded by <b>Aviv Mor</b>, a true shawarma lover with a passion for revolutionizing
            the shawarma industry. Aviv is a master chef who has taken shawarma to new heights, combining tradition with
            innovation to create a world-class dining experience.
          </p>
        </div>
      </div>

      <div className="graphs">
        <div className="graph">
          <h2>Shawarma Love in Israel</h2>
          <Bar data={shawarmaLoveData} />
        </div>
        <div className="graph">
          <h2>Happiness After Eating Shawarma</h2>
          <Bar data={happinessData} />
        </div>
        <div className="graph">
          <h2>Most Beloved Shawarma Extras</h2>
          <Bar data={extrasData} />
        </div>
      </div>
    </section>
  )
}
