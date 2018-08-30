import React, { Component } from 'react';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
      <section id="hero">
      <img id="hero-image" src="./assets/storm.jpg" />
      <div id="hero-content">
       <h1>Disaster Tracker</h1>
       <p>Know when danger is coming right from your phone</p>
       </div>
       </section>
      </div>
    )
  }
}

export default Landing;