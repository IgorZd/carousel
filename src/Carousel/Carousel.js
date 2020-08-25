import React from "react";
const { Provider, Consumer } = React.createContext();

export { Consumer }; // for Carousel components only

export class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.registerSlide = this.registerSlide.bind(this);
    this.maybeAutoplay = this.maybeAutoplay.bind(this);
    this.state = {
      isLooped: props.loop,
      slides: [],
      currentIndex: props.index || 0,
      next: this.next,
      previous: this.previous,
      registerSlide: this.registerSlide,
      baseSlideProps: props.slideProps
    };
    this.maybeAutoplay();
  }
  static getDerivedStateFromProps({ index }, { currentIndex }) {
    if (index !== undefined && index !== currentIndex) {
      return { currentIndex: index };
    }
    return null;
  }
  maybeAutoplay() {
    if (this.props.autoplay) {
      clearTimeout(this.autoplayId);
      this.autoplayId = setTimeout(this.next, this.props.duration || 1e3);
    }
  }
  registerSlide() {
    const slideId = Math.floor(Math.random() * 1e6);
    const getSlideIndex = slides =>
      slides.indexOf(slides.find(({ id }) => id === slideId));
    this.setState(({ slides }) => ({
      slides: [
        ...slides,
        {
          id: slideId,
          makeCurrentSlide: totalTime => {
            clearTimeout(this.indicatorTimerId);
            let keepGoing = true;
            let delayTime;
            let index;
            const moveTowards = () => {
              this.indicatorTimerId = setTimeout(() => {
                this.setState(
                  ({ currentIndex }) => {
                    if (index === currentIndex) {
                      keepGoing = false;
                      return null;
                    }
                    return {
                      currentIndex:
                        index > currentIndex
                          ? currentIndex + 1
                          : currentIndex - 1
                    };
                  },
                  keepGoing ? moveTowards : this.maybeAutoplay
                );
              }, delayTime);
            };

            this.setState(
              ({ currentIndex, slides }) => {
                index = getSlideIndex(slides);
                delayTime = Math.floor(
                  totalTime / Math.abs(currentIndex - index)
                );
                if (index === currentIndex) {
                  keepGoing = false;
                  return null;
                }
                return {
                  currentIndex:
                    index > currentIndex ? currentIndex + 1 : currentIndex - 1
                };
              },
              keepGoing ? moveTowards : this.maybeAutoplay
            );
          }
        }
      ]
    }));
    return {
      isCurrentSlide: () =>
        this.state.currentIndex === getSlideIndex(this.state.slides),
      isNextSlide: () =>
        this.state.currentIndex ===
        (this.props.loop
          ? (getSlideIndex(this.state.slides) + this.state.slides.length - 1) %
            this.state.slides.length
          : getSlideIndex(this.state.slides) - 1),
      isPreviousSlide: () =>
        this.state.currentIndex ===
        (this.props.loop
          ? (getSlideIndex(this.state.slides) + 1) % this.state.slides.length
          : getSlideIndex(this.state.slides) + 1),
      deregisterSlide: () =>
        this.setState(({ slides }) => ({
          slides: slides.filter(({ id }) => id !== getSlideIndex(slides))
        }))
    };
  }
  next(event) {
    if (typeof this.props.next === "function") {
      this.props.next(event);
      this.maybeAutoplay();
    } else {
      this.setState(
        prevState => ({
          currentIndex: this.props.loop
            ? (prevState.currentIndex + 1) % prevState.slides.length
            : Math.min(prevState.currentIndex + 1, prevState.slides.length - 1)
        }),
        this.maybeAutoplay
      );
    }
  }
  previous(event) {
    if (typeof this.props.previous === "function") {
      this.props.previous(event);
      this.maybeAutoplay();
    } else {
      this.setState(
        prevState => ({
          currentIndex: this.props.loop
            ? (prevState.currentIndex + prevState.slides.length - 1) %
              prevState.slides.length
            : Math.max(prevState.currentIndex - 1, 0)
        }),
        this.maybeAutoplay
      );
    }
  }
  onComponentDidUpdate(prevProps, prevState) {
    const oldIndex = prevState.currentIndex;
    const newIndex = this.state.currentIndex;
    if (
      oldIndex !== newIndex &&
      typeof prevProps.onIndexDidChange === "function"
    ) {
      prevProps.onIndexDidChange(newIndex, oldIndex);
    }
  }
  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
