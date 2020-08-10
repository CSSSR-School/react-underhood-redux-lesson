import React from "react";

export const ReactReduxContext = React.createContext(null);

function Provider({store, children}) {
  return <ReactReduxContext.Provider value={store}>
      {children}
  </ReactReduxContext.Provider>;
}

// class Provider extends React.Component {
//   constructor(props) {
//     super(props);

//     const { store } = props;

//     this.state = store;
//   }

//   render() {
//     const Context = this.props.context || ReactReduxContext;

//     return (
//       <Context.Provider value={this.state}>
//         {typeof this.props.children === "function"
//           ? this.props.children(this.store)
//           : this.props.children}
//       </Context.Provider>
//     );
//   }
// }

export default Provider;
