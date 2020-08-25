import React from "react";
import { Consumer } from "./Carousel";

class RegisteredSlide extends React.Component {
  constructor(props) {
    super(props);
    const {
      isCurrentSlide,
      isPreviousSlide,
      isNextSlide,
      deregisterSlide
    } = props.registerSlide();
    this.deregisterSlide = deregisterSlide;
    this.isCurrentSlide = isCurrentSlide;
    this.isNextSlide = isNextSlide;
    this.isPreviousSlide = isPreviousSlide;
  }
  onComponentWillUnmount() {
    this.deregisterSlide();
  }
  render() {
    const {
      registerSlide, // don't pass down
      tag,
      children,
      slideProps: {
        all: {
          className: allClassName = "",
          style: allStyle = {},
          tag: allTag,
          ...allOtherProps
        } = {},
        next: {
          className: nextClassName = "",
          style: nextStyle = {},
          tag: nextTag,
          ...nextOtherProps
        } = {},
        previous: {
          className: previousClassName = "",
          style: previousStyle = {},
          tag: prevTag,
          ...previousOtherProps
        } = {},
        current: {
          className: currentClassName = "",
          style: currentStyle = {},
          tag: currentTag,
          ...currentOtherProps
        } = {}
      },
      className = "",
      style = {},
      ...rest
    } = this.props;
    let finalClassName = `${className} ${allClassName}`;
    let finalStyle = Object.assign({}, style, allStyle);
    let finalOtherProps = { ...allOtherProps };
    let SlideTag = allTag || tag || "div";
    if (this.isCurrentSlide()) {
      finalClassName += ` ${currentClassName}`;
      finalStyle = Object.assign(finalStyle, currentStyle);
      finalOtherProps = Object.assign(finalOtherProps, currentOtherProps);
      SlideTag = currentTag || allTag || tag || "div";
    }
    if (this.isNextSlide()) {
      finalClassName += ` ${nextClassName}`;
      finalStyle = Object.assign(finalStyle, nextStyle);
      finalOtherProps = Object.assign(finalOtherProps, nextOtherProps);
      SlideTag = nextTag || allTag || tag || "div";
    }
    if (this.isPreviousSlide()) {
      finalClassName += ` ${previousClassName}`;
      finalStyle = Object.assign(finalStyle, previousStyle);
      finalOtherProps = Object.assign(finalOtherProps, previousOtherProps);
      SlideTag = prevTag || allTag || tag || "div";
    }
    return (
      <SlideTag
        className={finalClassName}
        style={finalStyle}
        {...finalOtherProps}
        {...rest}
      >
        {children}
      </SlideTag>
    );
  }
}

export const Slide = ({
  slideProps: { current = {}, next = {}, previous = {} } = {},
  ...props
}) => (
  <Consumer>
    {({ registerSlide, baseSlideProps = {} }) => (
      <RegisteredSlide
        {...props}
        registerSlide={registerSlide}
        slideProps={{
          all: baseSlideProps.all,
          current: { ...baseSlideProps.current, ...current },
          next: { ...baseSlideProps.next, ...next },
          previous: { ...baseSlideProps.previous, ...previous }
        }}
      />
    )}
  </Consumer>
);
