import React from "react";
import { Consumer } from "./Carousel";

export const PreviousButton = ({ tag: Tag = "button", children, ...props }) => (
  <Consumer>
    {({ previous, isLooped, currentIndex }) => (
      <Tag
        disabled={!isLooped && currentIndex === 0}
        type="button"
        {...props}
        onClick={previous}
      >
        {children}
      </Tag>
    )}
  </Consumer>
);
