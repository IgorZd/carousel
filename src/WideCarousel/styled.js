import styled from "react-emotion";
import { Slide, NextButton, PreviousButton } from "../Carousel";

export const StyledFrame = styled("div")`
  display: inline-flex;
  overflow: hidden;
  position: relative;
  width: 636px;
  height: 607px;
`;

export const StyledSlide = styled(Slide)`
  display: inline-block;
  width: min-content;
  background-color: #fff;
`;

export const StyledNextBtn = styled(NextButton)`
  color: #000;
  font-size: 2em;
  padding: 1em;
  margin: 0 0.25em;
  vertical-align: top;
  display: inline-flex;
  justify-items: center;
  align-items: center;
  background: none;
  border: none;
  height: 607px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  &:focus {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const StyledPrevBtn = styled(PreviousButton)`
  color: #000;
  font-size: 2em;
  padding: 1em;
  margin: 0 0.25em;
  vertical-align: top;
  display: inline-flex;
  justify-items: center;
  align-items: center;
  background: none;
  border: none;
  height: 607px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  &:focus {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
