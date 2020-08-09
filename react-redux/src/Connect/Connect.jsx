

// export default function connect() {
//     // здесь должна быть реализация
// }

import React from "react";

export default function connect(state, dispatch) {
  return function (HoccedComponent) {
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.state = state;
      }
      render() {
        return <HoccedComponent {...this.props} {...this.state} />;
      }
    };
  };
}
