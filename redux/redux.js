module.exports = {
  createStore(reducer, initialState, middlewares) {
    function compose(...funcs) {
      if (funcs.length === 0) {
        return (arg) => arg;
      }

      if (funcs.length === 1) {
        return funcs[0];
      }

      return funcs.reduce((a, b) => (...args) => a(b(...args)));
    }
    function applyMiddleware(...middlewares) {
      return (createStore) => (reducer, preloadedState, enhancer) => {
        const store = createStore(reducer, preloadedState, enhancer);
        let dispatch = store.dispatch;
        let chain = [];

        const middlewareAPI = {
          getState: store.getState,
          dispatch: (action) => dispatch(action),
        };
        chain = middlewares.map((middleware) => middleware(middlewareAPI));
        dispatch = compose(...chain)(store.dispatch);

        return {
          ...store,
          dispatch,
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
