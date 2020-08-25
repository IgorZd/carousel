import React from "react";
import { Carousel } from "../Carousel";
import {
  StyledSlide,
  StyledNextBtn,
  StyledPrevBtn,
  StyledFrame
} from "./styled";
import { Bio, teamBios } from "../Bio";

export default class WideCarousel extends React.Component {
  state = { index: 0, leftMargin: 0 };
  next = () => {
    this.setState(({ index, leftMargin }) => {
      const newIndex = (index + 1) % (teamBios.length - 1);
      return {
        index: newIndex,
        leftMargin: -318 * newIndex
      };
    });
  };
  previous = () => {
    this.setState(({ index, leftMargin }) => {
      const newIndex = (index - 1 + teamBios.length) % teamBios.length;
      return {
        index: newIndex,
        leftMargin: -318 * newIndex
      };
    });
  };
  render() {
    return (
      <Carousel
        loop
        index={this.state.index}
        next={this.next}
        previous={this.previous}
      >
        <StyledPrevBtn aria-label="previous">⟪</StyledPrevBtn>
        <StyledFrame>
          {teamBios.map(({ name, imageSrc }, index) => (
            <StyledSlide
              style={
                index === 0
                  ? {
                      marginLeft: this.state.leftMargin,
                      transition: "margin-left 400ms ease-in-out"
                    }
                  : {}
              }
            >
              <Bio name={name} imageSrc={imageSrc} />
            </StyledSlide>
          ))}
        </StyledFrame>
        <StyledNextBtn aria-label="next">⟫</StyledNextBtn>
      </Carousel>
    );
  }
}
