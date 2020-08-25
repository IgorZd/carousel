import React from "react";
import { Consumer } from "./Carousel";

export const Indicators = ({
  indicatorProps = {},
  groupLabel,
  duration = 300,
  tag: Tag = "div",
  ...props
}) => (
  <Consumer>
    {({ slides, currentIndex }) => {
      const indicatorLabelId =
        "IndicatorGroup_" +
        slides.reduce((indicatorId, { id }) => indicatorId + id, "");
      const {
        active: {
          className: activeClassName = "",
          style: activeStyle = {},
          tag: activeTag,
          ...activeOtherProps
        } = {},
        inactive: {
          className: inactiveClassName = "",
          style: inactiveStyle = {},
          tag: inactiveTag,
          ...inactiveOtherProps
        } = {}
      } = indicatorProps;
      const ariaLabel = !!groupLabel
        ? { "aria-labelledby": indicatorLabelId }
        : {};
      return (
        <Tag {...ariaLabel} {...props} role="group">
          {!!groupLabel && (
            <div
              id={indicatorLabelId}
              style={{
                /* visually hidden */
                position: "absolute !important",
                height: 1,
                width: 1,
                overflow: "hidden",
                clip: "rect(1px, 1px, 1px, 1px)"
              }}
            >
              {groupLabel}
            </div>
          )}
          {slides.map((slide, index) => {
            const {
              className: allClassName = "",
              style: allStyle = {},
              tag: allTag,
              ...allOtherProps
            } =
              typeof indicatorProps.all === "function"
                ? indicatorProps.all(index) || {}
                : indicatorProps.all || {};
            const isCurrent = index === currentIndex;
            const otherProps = isCurrent
              ? activeOtherProps
              : inactiveOtherProps;
            const IndicatorTag =
              (isCurrent ? activeTag : inactiveTag) || allTag || "button";
            return (
              <IndicatorTag
                disabled={isCurrent}
                onClick={() => slide.makeCurrentSlide(duration)}
                {...allOtherProps}
                {...otherProps}
                className={`${allClassName} ${
                  isCurrent ? activeClassName : inactiveClassName
                }`}
                style={Object.assign(
                  {},
                  allStyle,
                  isCurrent ? activeStyle : inactiveStyle
                )}
                type="button"
              />
            );
          })}
        </Tag>
      );
    }}
  </Consumer>
);
