import React from "react";

export class GestureTarget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  beginGesture({ targetTouches }) {}

  render() {
    const { tag: Tag = "div", children, ...props } = this.props;
    return (
      <Tag
        {...props}
        onTouchStart={this.beginGesture}
        onTouchEnd={this.endGesture}
        onTouchCancel={this.cancelGesture}
      >
        {children}
      </Tag>
    );
  }
}
