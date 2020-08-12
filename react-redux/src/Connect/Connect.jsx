import React from "react";
import { ReactReduxContext } from "../Provider/Provider";

export default function connect(mapStateToProps, mapDispatchToProps) {
  return function (HoccedComponent) {
    class MyClass extends React.PureComponent {
      constructor(props) {
        super(props);
        this.renderHoccedComponent = this.renderHoccedComponent.bind(this);
      }

      listener = (params) => {
        this.setState(params);
      };

      componentDidMount() {
        let value = this.context;
        const stateFromStore = value.getState();
        this.setState(mapStateToProps(stateFromStore));
      }

      componentDidUpdate() {
        let value = this.context;
        const stateFromStore = value.getState();
        this.setState(mapStateToProps(stateFromStore));
      }

      renderHoccedComponent(store) {
        const dispatch =
          mapDispatchToProps && mapDispatchToProps(store.dispatch.bind(store));
        return <HoccedComponent {...this.state} {...dispatch} />;
      }
      render() {
        return (
          <ReactReduxContext.Consumer>
            {this.renderHoccedComponent}
          </ReactReduxContext.Consumer>
        );
      }
    }
    MyClass.contextType = ReactReduxContext;
    return MyClass;
  };
}
