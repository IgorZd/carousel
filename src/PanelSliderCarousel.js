import React from "react";
import chunk from "lodash.chunk";
import {
  Carousel,
  Slide,
  NextButton,
  PreviousButton,
  Indicators
} from "./Carousel";
import { Bio, teamBios } from "./Bio";

const chunked = chunk(teamBios, 2);
export default class PanelSliderCarousel extends React.Component {
  state = { direction: "forward" };
  render() {
    return (
      <Carousel
        slideProps={{
          all: {
            style: {
              position: "absolute",
              transform: "translateX(100%)",
              transition: "transform ease-in-out 400ms",
              display: "inline-block",
              width: "minContent",
              backgroundColor: "#fff"
            },
            hidden: true
          },
          next: {
            style: {
              transform: "translateX(100%)"
            }
          },
          previous: {
            style: {
              transform: "translateX(-100%)"
            }
          },
          current: {
            style: { transform: "translateX(0)" },
            hidden: false
          }
        }}
      >
        <PreviousButton
          style={{
            color: "#000",
            fontSize: "2em",
            padding: "1em",
            margin: "0 0.25em",
            verticalAlign: "top",
            display: "inline-flex",
            justifyItems: "center",
            alignItems: "center",
            background: "none",
            border: "none",
            height: "607px"
          }}
          aria-label="previous"
        >
          ⟪
        </PreviousButton>
        <div
          style={{
            display: "inline-block",
            overflow: "hidden",
            position: "relative",
            width: "640px",
            height: "607px"
          }}
        >
          {chunked.map(([bioA, bioB]) => (
            <Slide>
              <Bio name={bioA.name} imageSrc={bioA.imageSrc} />
              <Bio name={bioB.name} imageSrc={bioB.imageSrc} />
            </Slide>
          ))}
          <Indicators
            style={{
              position: "absolute",
              top: "370px",
              left: "50%",
              transform: "translateX(-50%)"
            }}
            duration={1000}
            groupLabel="Quick Links"
            indicatorProps={{
              all: i => ({
                style: {
                  borderRadius: "50%",
                  border: "1px solid #000",
                  padding: "0",
                  margin: "0.5em",
                  height: "1em",
                  width: "1em",
                  backgroundColor: "#fff",
                  transition: "transform 150ms ease-in-out"
                },
                "aria-label": `See ${chunked[i][0].name} and ${
                  chunked[i][1].name
                }`
              }),
              active: {
                style: {
                  transform: "scale(1.5)",
                  backgroundColor: "#bbb"
                }
              }
            }}
          />
        </div>
        <NextButton
          style={{
            color: "#000",
            fontSize: "2em",
            padding: "1em",
            margin: "0 0.25em",
            verticalAlign: "top",
            display: "inline-flex",
            justifyItems: "center",
            alignItems: "center",
            background: "none",
            border: "none",
            height: "607px"
          }}
          aria-label="next"
        >
          ⟫
        </NextButton>
      </Carousel>
    );
  }
}
