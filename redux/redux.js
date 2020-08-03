module.exports = {
  createStore(reducer, initialState, middlewares) {
    function applyMiddleware(...middlewares) {
      return (next) => (reducer, initialState) => {
        const store = next(reducer, initialState);

        const middlewareAPI = {
          getState: store.getState,
          dispatch: (action) => dispatch(action),
        };

        const chain = middlewares.map((middleware) => middleware(middlewareAPI));
        return {
          ...store,
          dispatch: [...chain, store.dispatch]
        };
      };
    }
    return new Redux(reducer, initialState, applyMiddleware(middlewares));
  },

  combineReducers() {
    // здесь должна быть реализация
  },
};

class Redux {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.subscribers = [];
  }
  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.subscribers.forEach((fn) => fn(this.value));
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];

    return () => {
      this.subscribers = this.subscribers.filter(
        (subscriber) => subscriber !== fn
      );
    };
  }

  unsubscribe(fn) {
    // здесь должна быть реализация
  }
}
