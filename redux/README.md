# redux-lesson

В данном уроке, для понимания как устроена библиотека `Redux` предлагается реализовать ее самостоятельно,
автоматические тесты будут проверять правильность решения.

1) Метод `createStore` принимает функцию редюсер которая возвращает следующее состояние, и начальное состояние, возвращает `Store` хранилище которое хранит состояние приложения.

2) Метод `getState` должен возвращать наше текущее состояние. Оно должно быть равно последнему возвращенному значению из редюсера хранилища.

3) Метод `dispatch` принимает действие, обьект и генерирует новое состояние с помощью действия, редюсера и предыдущего состояния, так же немедленно уведомляет подписчиков.

4) Метод `subscribe` принимает слушателя функцию, она должна вызываться каждый раз когда действие отправлено и некоторая часть состояния могла потенциально измениться. Должен возвращать функцию для отписки. Реализация данного функционала это посути реализация паттерна "наблюдатель".

5) Расширим функционал метода `createStore`, третьим параметром должен приниматься массив мидлвар (Middlewares), мидлвары это промежуточные обработчики действий, они обрабатывают действие перед тем как оно достигнет редюсера, их можно использовать например для логирования, обработки ошибок, либо для генерации новых действий, как например в случае с обработкой асинхронных действий. Мидлвары образуют цепочку, и вызываются по очереди, например:


```
const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}
```
Данный мидлвар логирует новое действие, вызывает дальнейшую обработку действия, и логирует новое состояние. Учитывая структуру объявления данного мидлвара, нужно расширить функционал нашей `Redux` реализации.
При инициализации `Redux` мидлвары должны выстраиваться в цепочку, каждый мидлвар должен вызывать следующий, и так до редьюсера стора dispatch(action) -> middleware1.next -> middleware2.next -> middleware3.next -> store.dispatch. Данная цепочка должна формироваться только один раз, при инициализации стора.

Самостоятельно написать мидлвар для обработки асинхронных действий.

6) Состовные редюсеры, в комплекте с библиотекой `Redux` идет вспомогательная функция, которая помогает объеденять редюсеры, в случае если ваше приложение стало большим, и одним редьюсером уже не обойтись, 

```
const reducer = combineReducer({
    user: userReducer,
    todo: todoReducer,
});

Это создаст следующее состояние:

{
    user,
    todo
}

Если представить какая фунцкция должна получиться в результате, можно представить следующую функцию:

function reducer(state, action) {
    return {
        user: userReducer(state.user, action),
        todo: todoReducer(state.todo, action)
    }
}

Самостоятельно реализуйте данную функцию, есть несколько правил:

    а) Редьюсер никогда не должен возвращать undefined, если вернулось undefined, combineReducers должен создать исключение
    б) Если свойство в обьекте не является функцией, оно должно игнорироваться.
```

Для запуска тестов `npm run test`