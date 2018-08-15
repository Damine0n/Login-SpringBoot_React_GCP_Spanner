import React from "react";

const Weather = props => (
  <div>
    {props.error && <p>{props.error}</p>}
  </div>
);

export default Weather;
