import React from "react";
import ReactDOM from "react-dom";
import SliderCarousel from "./SliderCarousel";
import PanelSliderCarousel from "./PanelSliderCarousel";
import WideCarousel from "./WideCarousel";

function App() {
  return (
    <>
      <h2>Slider Carousel</h2>
      <SliderCarousel />
      <hr />
      <h2>Slider Carousel With Multiple Panels</h2>
      <PanelSliderCarousel />
      <hr />
      <h2>One at a time</h2>
      <WideCarousel />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
