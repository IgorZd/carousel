import React from "react";
import { Consumer } from "./Carousel";

export const NextButton = ({ tag: Tag = "button", children, ...props }) => (
  <Consumer>
    {({ next, isLooped, slides, currentIndex }) => (
      <Tag
        disabled={!isLooped && currentIndex === slides.length - 1}
        type="button"
        {...props}
        onClick={next}
      >
        {children}
      </Tag>
    )}
  </Consumer>
);
