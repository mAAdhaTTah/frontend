---
description: Brookjs components strawman proposal
status: publish
gistId: ''
sync: false
createdAt: '2017-12-20T13:15:23.000Z'
updatedAt: '2018-01-09T12:22:54.000Z'
blobs:
  - filename: TodoItem.js
    code: |-
      import { h, component } from 'brookjs'
      import { editClick } from '../actions'

      // Changes only occur when bound to a stream
      export default component({
          render: props$ => (
              <li>
                  {/* Text changes when a value is emitted. */}
                  <p class="todo__name">
                      {props$.map(props => props.text)}
                  </p>
                  {/* Maps a stream of events to actions. */}
                  <button onClick={event$ => event$.map(editClick)}>
                      {'Edit todo'}
                  </button>
              </li>
          )
      })
    language: jsx
  - filename: TodoList.js
    code: |-
      import { h, component } from 'brookjs'
      import TodoItem from './TodoItem'

      export default component({
          render: props$ => (
              <div>
                  <h2>My Todos</h2>
                  {/**
                    * `order` provides sequence todos should appear
                    * `dict` provides a performant instance lookup 
                    */}
                  <ul>
                      {props$.map(todos => todos.order.map(key => (
                          <TodoItem
                              props$={props$.map(todos => todos.dict[key])}
                              key={key}
                              preplug={instance$ => instance$.map(action => ({
                                  ...action,
                                  meta: { key }
                              })} />
                      )))}
                  <ul>
              </div>
          )
      })
    language: jsx
  - filename: App.js
    code: |-
      import { h, component } from 'brookjs'
      import TodoList from './TodoList'

      export default component({
          render: props$ => (
              <div>
                  <h1>Todo App</h1>
                  {/**
                    * Individual attributes respond to observables
                    * Performance optimized inline
                    */}
                  <input value={props$.map(props => props.editing).skipDuplicates()}
                         onInput={event$ => event$.map(event => editTodo(event.target.value))} />
                  <button onClick={event$ => event$.map(addTodo)}>Add Todo</button>
                  <TodoList props$={props$.map(props => props.todos)} />
              </div>
          )
      })
    language: jsx
  - filename: client.js
    code: |-
      import { createStore, applyMiddleware } from 'redux'
      import { h, observeDelta, Kefir } from brookjs
      import { App } from './components'
      import { selectProps } from './selectors'

      const store = createStore(
          (state, action) => state, // reducer
          window.__INITIAL_STATE__ || {},
          applyMiddleware(observeDelta(
              /* register deltas here */
          )
      )
      const state$ = Kefir.fromESObservable(store)

      /**
       * `mount` thus takes the DOM to mount
       * and the element to bind it to, and
       * returns a stream. Note that because
       * of how streams work, nothing happens
       * until the stream is observed.
       */
      const view$ = mount(
          <App props$={selectProps(state$)} />,
          document.getElementById('app')
      )
       
      view$.observe(store.dispatch)
    language: jsx
  - filename: TodoListWithIterationHelper.js
    code: |-
      import { h, component, list } from 'brookjs'
      import TodoItem from './TodoItem'

      export default component({
          render: props$ => (
              <div>
                  <h2>My Todos</h2>
                  <ul>
                      {/* Must be a stream of objects with `order` & `dict` */}
                      {list(props$, (props$, key) => (
                          <TodoItem
                              props$={props$}
                              key={key}
                              preplug={instance$ => instance$.map(action => ({
                                  ...action,
                                  meta: { key }
                              })} />
                      )}
                  <ul>
              </div>
          )
      })
    language: jsx
  - filename: client-with-domDelta.js
    code: |-
      import { createStore, applyMiddleware } from 'redux'
      import { h, observeDelta, Kefir } from brookjs
      import { App } from './components'
      import { selectProps } from './selectors'

      const el = document.getElementById('app')

      const store = createStore(
          (state, action) => state,
          window.__INITIAL_STATE__ || {},
          applyMiddleware(observeDelta(
              /* register deltas here */
              domDelta({ el, selectProps, view: App })
          )
      )

      // Everything is bound to the store immediately,
      // but an init action makes sure everything waits
      // until the store is fully instantiated.
      store.dispatch(init())
    language: jsx
commits:
  - committedAt: '2018-01-09T17:22:54.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* Text changes when a value is emitted. */}
                      <p class="todo__name">
                          {props$.map(props => props.text)}
                      </p>
                      {/* Maps a stream of events to actions. */}
                      <button onClick={event$ => event$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem
                                  props$={props$.map(todos => todos.dict[key])}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes respond to observables
                        * Performance optimized inline
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={event$ => event$.map(event => editTodo(event.target.value))} />
                      <button onClick={event$ => event$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const store = createStore(
              (state, action) => state, // reducer
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={selectProps(state$)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem
                                  props$={props$}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2018-01-09T17:21:53.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'
          test
          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* Text changes when a value is emitted. */}
                      <p class="todo__name">
                          {props$.map(props => props.text)}
                      </p>
                      {/* Maps a stream of events to actions. */}
                      <button onClick={event$ => event$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem
                                  props$={props$.map(todos => todos.dict[key])}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes respond to observables
                        * Performance optimized inline
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={event$ => event$.map(event => editTodo(event.target.value))} />
                      <button onClick={event$ => event$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const store = createStore(
              (state, action) => state, // reducer
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={selectProps(state$)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem
                                  props$={props$}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2018-01-09T17:21:03.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* Text changes when a value is emitted. */}
                      <p class="todo__name">
                          {props$.map(props => props.text)}
                      </p>
                      {/* Maps a stream of events to actions. */}
                      <button onClick={event$ => event$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem
                                  props$={props$.map(todos => todos.dict[key])}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes respond to observables
                        * Performance optimized inline
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={event$ => event$.map(event => editTodo(event.target.value))} />
                      <button onClick={event$ => event$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const store = createStore(
              (state, action) => state, // reducer
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={selectProps(state$)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem
                                  props$={props$}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2018-01-05T18:46:43.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* Text changes when a value is emitted. */}
                      <p class="todo__name">
                          {props$.map(props => props.text)}
                      </p>
                      {/* Maps a stream of events to actions. */}
                      <button onClick={event$ => event$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem
                                  props$={props$.map(todos => todos.dict[key])}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes respond to observables
                        * Performance optimized inline
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={event$ => event$.map(event => editTodo(event.target.value))} />
                      <button onClick={event$ => event$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'
          import { globals

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={selectProps(state$)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem
                                  props$={props$}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2017-12-30T23:50:30.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* Text changes when a value is emitted. */}
                      <p class="todo__name">
                          {props$.map(props => props.text)}
                      </p>
                      {/* Maps a stream of events to actions. */}
                      <button onClick={event$ => event$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem
                                  props$={props$.map(todos => todos.dict[key])}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes respond to observables
                        * Performance optimized inline
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={event$ => event$.map(event => editTodo(event.target.value))} />
                      <button onClick={event$ => event$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'
          import { globals

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={selectProps(state$)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (child$, key) => (
                              <TodoItem
                                  props$={child$}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2017-12-30T23:04:09.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* Text changes when a value is emitted. */}
                      <p class="todo__name">
                          {props$.map(props => props.text)}
                      </p>
                      {/* Maps a stream of events to actions. */}
                      <button onClick={event$ => event$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem
                                  props$={props$.map(todos => todos.dict[key])}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes respond to observables
                        * Performance optimized inline
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={event$ => event$.map(event => editTodo(event.target.value))} />
                      <button onClick={event$ => event$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'
          import { globals

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={selectProps(state$)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem
                                  props$={props$}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2017-12-30T22:55:21.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* Text changes when a value is emitted. */}
                      <p class="todo__name">
                          {props$.map(props => props.text)}
                      </p>
                      {/* Maps a stream of events to actions. */}
                      <button onClick={event$ => event$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem
                                  props$={props$.map(todos => todos.dict[key])}
                                  key={key}
                                  preplug={instance$ => instance$.map(action => ({
                                      ...action,
                                      meta: { key }
                                  })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes respond to observables
                        * Performance optimized inline
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={event$ => event$.map(event => editTodo(event.target.value))} />
                      <button onClick={event$ => event$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'
          import { globals

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={state$.thru(selectProps)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem props$={props$}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2017-12-30T22:49:30.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* Text changes when a value is emitted. */}
                      <p class="todo__name">
                          {props$.map(props => props.text)}
                      </p>
                      {/* Maps a stream of events to actions. */}
                      <button onClick={event$ => event$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem props$={props$.map(todos => todos.dict[key])}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={event$ => event$.map(event => editTodo(event.target.value))} />
                      <button onClick={event$ => event$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'
          import { globals

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={state$.thru(selectProps)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem props$={props$}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2017-12-30T22:47:03.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* Text changes when a value is emitted. */}
                      <p class="todo__name">
                          {props$.map(props => props.text)}
                      </p>
                      {/* Maps a stream of events to actions. */}
                      <button onClick={events$ => events$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem props$={props$.map(todos => todos.dict[key])}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={events$ => events$.map(e => editTodo(e.target.value))} />
                      <button onClick={events$ => events$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'
          import { globals

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={state$.thru(selectProps)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem props$={props$}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2017-12-30T22:27:30.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <li>
                      {/* This text changes when a value is emitted. */}
                      <p class="todo__name">{props$.map(props => props.text)}</p>
                      {/* This function maps a stream of events to actions. */}
                      <button onClick={events$ => events$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem props$={props$.map(todos => todos.dict[key])}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={events$ => events$.map(e => editTodo(e.target.value))} />
                      <button onClick={events$ => events$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'
          import { globals

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={state$.thru(selectProps)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem props$={props$}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2017-12-30T21:49:47.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component, render } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: render(props$ => (
                  <li>
                      {/* This text changes when a value is emitted. */}
                      <p class="todo__name">{props$.map(props => props.text)}</p>
                      {/* This function maps a stream of events to actions. */}
                      <button onClick={events$ => events$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              ))
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem props$={props$.map(todos => todos.dict[key])}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={events$ => events$.map(e => editTodo(e.target.value))} />
                      <button onClick={events$ => events$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'
          import { globals

          const store = createStore(
              reducer,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={state$.thru(selectProps)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem props$={props$}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2017-12-30T21:42:28.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component, render } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: render(props$ => (
                  <li>
                      {/* This text changes when a value is emitted. */}
                      <p class="todo__name">{props$.map(props => props.text)}</p>
                      {/* This function maps a stream of events to actions. */}
                      <button onClick={events$ => events$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              ))
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem props$={props$.map(todos => todos.dict[key])}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={events$ => events$.map(e => editTodo(e.target.value))} />
                      <button onClick={events$ => events$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'
          import { globals

          const store = createStore(
              reducer,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how streams work, nothing happens
           * until the stream is observed.
           */
          const view$ = mount(
              <App props$={state$.thru(selectProps)} />,
              document.getElementById('app')
          )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem props$={props$}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: client-with-domDelta.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const el = document.getElementById('app')

          const store = createStore(
              (state, action) => state, // reducer created inline or imported
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
                  domDelta({ el, selectProps, view: App })
              )
          )

          // Everything is bound to the store immediately,
          // but an init action makes sure everything waits
          // until the store is fully instantiated.
          store.dispatch(init())
        language: jsx
  - committedAt: '2017-12-30T21:11:39.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component, render } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: render(props$ => (
                  <li>
                      {/* This text changes when a value is emitted. */}
                      <p class="todo__name">{props$.map(props => props.text)}</p>
                      {/* This function maps a stream of events to actions. */}
                      <button onClick={events$ => events$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              ))
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem props$={props$.map(todos => todos.dict[key])}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={events$ => events$.map(e => editTodo(e.target.value))} />
                      <button onClick={events$ => events$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'
          import { selectProps } from './selectors'

          const store = createStore(
              reducer,
              window.__INITIAL_STATE__ || {},
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$.thru(selectProps)} />,
              document.getElementById('app')
           )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      <ul>
                          {/* Must be a stream of objects with `order` & `dict` */}
                          {list(props$, (props$, key) => (
                              <TodoItem props$={props$}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
  - committedAt: '2017-12-30T20:58:36.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component, render } from 'brookjs'
          import { editClick } from '../actions'

          // Changes only occur when bound to a stream
          export default component({
              render: render(props$ => (
                  <li>
                      {/* This text changes when a value is emitted. */}
                      <p class="todo__name">{props$.map(props => props.text)}</p>
                      {/* This function maps a stream of events to actions. */}
                      <button onClick={events$ => events$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              ))
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem props$={props$.map(todos => todos.dict[key])}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={events$ => events$.map(e => editTodo(e.target.value))} />
                      <button onClick={events$ => events$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: |-
          import { createStore, applyMiddleware } from 'redux'
          import { h, observeDelta, Kefir } from brookjs
          import { App } from './components'

          const store = createStore(
              reducer,
              initial,
              applyMiddleware(observeDelta(
                  /* register deltas here */
              )
          )
          const state$ = Kefir.fromESObservable(store)

          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$} />,
              document.getElementById('app)
           )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/* Must be a stream of objects with `order` & `dict` */}
                      <ul>
                          {list(props$, (props$, key) => (
                              <TodoItem props$={props$}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
  - committedAt: '2017-12-30T20:55:54.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component, render } from 'brookjs'
          import { editClick } from './actions'

          // Changes only occur when bound to a stream
          export default component({
              render: render(props$ => (
                  <li>
                      {/* This text changes when a value is emitted. */}
                      <p class="todo__name">{props$.map(props => props.text)}</p>
                      {/* This function maps a stream of events to actions. */}
                      <button onClick={events$ => events$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </li>
              ))
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <TodoItem props$={props$.map(todos => todos.dict[key])}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={events$ => events$.map(e => editTodo(e.target.value))} />
                      <button onClick={events$ => events$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: >-
          import { createStore, applyMiddleware } from 'redux'

          import { h, observeDelta, Kefir } from brookjs


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$} />,
              document.getElementById('app)
           )
           
          view$.observe(store.dispatch)
        language: jsx
      - filename: TodoListWithIterationHelper.js
        code: |-
          import { h, component, list } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/* Must be a stream of objects with `order` & `dict` */}
                      <ul>
                          {list(props$, (props$, key) => (
                              <TodoItem props$={props$}
                                        key={key}
                                        preplug={instance$ => instance$.map(action => ({
                                            ...action,
                                            meta: { key }
                                        })} />
                          )}
                      <ul>
                  </div>
              )
          })
        language: jsx
  - committedAt: '2017-12-30T20:50:50.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component, render } from 'brookjs'
          import { editClick } from './actions'

          // Changes only occur when bound to a stream
          export default component({
              render: render(props$ => (
                  <div>
                      {/* This text changes when a value is emitted. */}
                      <p class="todo__name">{props$.map(props => props.text)}</p>
                      {/* This function maps a stream of events to actions. */}
                      <button onClick={events$ => events$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </div>
              ))
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup 
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <li>
                                  <TodoItem props$={props$.map(todos => todos.dict[key])}
                                            key={key}
                                            preplug={instance$ => instance$.map(action => ({
                                                ...action,
                                                meta: { key }
                                            })} />
                              </li>
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={events$ => events$.map(e => editTodo(e.target.value))} />
                      <button onClick={events$ => events$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: >-
          import { createStore, applyMiddleware } from 'redux'

          import { h, observeDelta, Kefir } from brookjs


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$} />,
              document.getElementById('app)
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-30T20:14:08.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component, render } from 'brookjs'
          import { editClick } from './actions'

          // Changes only occur when bound to a stream
          export default component({
              render: render(props$ => (
                  <div>
                      {/* This text changes when a value is emitted. */}
                      <p class="todo__name">{props$.map(props => props.text)}</p>
                      {/* This function maps a stream of events to actions. */}
                      <button onClick={events$ => evt$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </div>
              ))
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * We recommend handling lists with an order & a dictionary
                        *
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup
                        *
                        * We could also provide an interation helper, but the basic issue is that
                        * we need to ensure a component gets a props$ stream of its
                        * particular props. Searching through an array for the correct
                        * instance based on a key could hurt performance.
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <li>
                                  <TodoItem props$={props$.map(todos => todos.dict[key])}
                                            key={key}
                                            preplug={instance$ => instance$.map(action => ({
                                                ...action,
                                            meta: { key }
                                            })} />
                              </li>
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: >-
          import { createStore, applyMiddleware } from 'redux'

          import { h, observeDelta, Kefir } from brookjs


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$} />,
              document.getElementById('app)
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-30T19:58:58.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from './actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <div>
                      {/* This text changes when a value is emitted. */}
                      <p>{props$.map(props => props.text)}</p>
                      {/* This function maps a stream of events to actions. */}
                      <button onClick={evt$ => evt$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </div>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * We recommend handling lists with an order & a dictionary
                        *
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup
                        *
                        * We could also provide an interation helper, but the basic issue is that
                        * we need to ensure a component gets a props$ stream of its
                        * particular props. Searching through an array for the correct
                        * instance based on a key could hurt performance.
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <li>
                                  <TodoItem props$={props$.map(todos => todos.dict[key])}
                                            key={key}
                                            preplug={instance$ => instance$.map(action => ({
                                                ...action,
                                            meta: { key }
                                            })} />
                              </li>
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: >-
          import { createStore, applyMiddleware } from 'redux'

          import { h, observeDelta, Kefir } from brookjs


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$} />,
              document.getElementById('app)
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-30T19:56:41.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'
          import { editClick } from './actions'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <div>
                      {/**
                        * This text changes when a value is emitted
                        */}
                      <p>{props$.map(props => props.text)}</p>
                      <button onClick={evt$ => evt$.map(editClick)}>
                          {'Edit todo'}
                      </button>
                  </div>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * We recommend handling lists with an order & a dictionary
                        *
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup
                        *
                        * We could also provide an interation helper, but the basic issue is that
                        * we need to ensure a component gets a props$ stream of its
                        * particular props. Searching through an array for the correct
                        * instance based on a key could hurt performance.
                        */}
                      <ul>
                          {props$.map(todos => todos.order.map(key => (
                              <li>
                                  <TodoItem props$={props$.map(todos => todos.dict[key])}
                                            key={key}
                                            preplug={instance$ => instance$.map(action => ({
                                                ...action,
                                            meta: { key }
                                            })} />
                              </li>
                          )))}
                      <ul>
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: >-
          import { createStore, applyMiddleware } from 'redux'

          import { h, observeDelta, Kefir } from brookjs


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$} />,
              document.getElementById('app)
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-29T16:17:09.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: TodoItem.js
        code: |-
          import { h, component } from 'brookjs'

          // Changes only occur when bound to a stream
          export default component({
              render: props$ => (
                  <div>
                      {/**
                        * This text changes when a value is emitted
                        */}
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })
        language: jsx
      - filename: TodoList.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoItem from './TodoItem'

          export default component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * We recommend handling lists with an order & a dictionary
                        *
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup
                        *
                        * We could also provide an interation helper, but the basic issue is that
                        * we need to ensure a component gets a props$ stream of its
                        * particular props. Searching through an array for the correct
                        * instance based on a key could hurt performance.
                        */}
                      {props$.map(todos => todos.order.map(key => (
                          <TodoItem props$={props$.map(todos => todos.dict[key])}
                                    key={key}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key }
                                    })} />
                      )))}
                  </div>
              )
          })
        language: jsx
      - filename: App.js
        code: |-
          import { h, component } from 'brookjs'
          import TodoList from './TodoList'

          export default component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })
        language: jsx
      - filename: client.js
        code: >-
          import { createStore, applyMiddleware } from 'redux'

          import { h, observeDelta, Kefir } from brookjs


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$} />,
              document.getElementById('app)
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-20T19:26:06.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { h, component, mount, Kefir } from 'brookjs'


          // Changes only occur when bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      {/**
                        * This text changes when a value is emitted
                        */}
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * We recommend handling lists with an order & a dictionary
                        *
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup
                        *
                        * We could also provide an interation helper, but the basic issue is that
                        * we need to ensure a component gets a props$ stream of its
                        * particular props. Searching through an array for the correct
                        * instance based on a key could hurt performance.
                        */}
                      {props$.map(todos => todos.order.map(key => (
                          <TodoItem props$={props$.map(todos => todos.dict[key])}
                                    key={key}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      {/**
                        * Individual attributes change in response to observables
                        * Performance can be optimized inline with `filter` or `skipDuplicates`
                        */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)



          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$} />,
              document.getElementById('app)
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-20T19:25:03.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { h, component, mount, Kefir } from 'brookjs'


          // Changes only occur when bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      { /* This text changes when a value is emitted */ }
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * We recommend handling lists with an order & a dictionary
                        *
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup
                        *
                        * We could also provide an interation helper, but the basic issue is that
                        * we need to ensure a component gets a props$ stream of its
                        * particular props. Searching through an array for the correct
                        * instance based on a key could hurt performance.
                        */}
                      {props$.map(todos => todos.order.map(key => (
                          <TodoItem props$={props$.map(todos => todos.dict[key])}
                                    key={key}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      { /* Individual attributes change in response to observables */}
                      { /* Performance can be optimized inline with `filter` or `skipDuplicates` */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)



          /**
           * `mount` thus takes the DOM to mount
           * and the element to bind it to, and
           * returns a stream. Note that because
           * of how stream
           */
          const view$ = mount(
              <App props$={state$} />,
              document.getElementById('app)
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-20T18:15:18.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { h, component, mount, Kefir } from 'brookjs'


          // Changes only occur when bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      { /* This text changes when a value is emitted */ }
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {/**
                        * We recommend handling lists with an order & a dictionary
                        *
                        * `order` provides sequence todos should appear
                        * `dict` provides a performant instance lookup
                        *
                        * We could also provide an interation helper, but the basic issue is that
                        * we need to ensure a component gets a props$ stream of its
                        * particular props. Searching through an array for the correct
                        * instance based on a key could hurt performance.
                        */}
                      {props$.map(todos => todos.order.map(key => (
                          <TodoItem props$={props$.map(todos => todos.dict[key])}
                                    key={key}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      { /* Individual attributes change in response to observables */}
                      { /* Performance can be optimized inline with `filter` or `skipDuplicates` */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          const view$ = mount(
              document.getElementById('app),
              <App props$={state$} />
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-17T19:09:55.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { h, component, mount, Kefir } from 'brookjs'


          // Changes are only bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      { /* Only change this text when a value is emitted */ }
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      { /* Lists are handled with an order & a dictionary */ }
                      { /* `order` provides sequence todos should appear */ }
                      { /* `dict` provides a performant instance lookup */ }
                      {props$.map(todos => todos.order.map(key => (
                          <TodoItem props$={props$.map(todos => todos.dict[key])}
                                    key={key}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => (
                  <div>
                      <h1>Todo App</h1>
                      { /* Individual attributes change in response to observables */}
                      { /* Performance can be optimized with `filter` or `skipDuplicates` */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
              )
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          const view$ = mount(
              document.getElementById('app),
              <App props$={state$} />
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-17T19:08:14.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { h, component, mount, Kefir } from 'brookjs'


          // Changes are only bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      { /* Only change this text when a value is emitted */ }
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      { /* Lists are handled with an order & a dictionary */ }
                      { /* `order` provides sequence todos should appear */ }
                      { /* `dict` provides a performant instance lookup */ }
                      {props$.map(todos => todos.order.map(key => (
                          <TodoItem props$={props$.map(todos => todos.dict[key])}
                                    key={key}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => {
                  return (
                  <div>
                      <h1>Todo App</h1>
                      { /* Individual attributes change in response to observables */}
                      { /* Performance can be optimized with `filter` or `skipDuplicates` */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
                  )
              }
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          const view$ = mount(
              document.getElementById('app),
              <App props$={state$} />
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-17T19:06:07.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { h, component, mount, Kefir } from 'brookjs'


          // Changes are only bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      { /* Only change this text when a value is emitted */ }
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      { /* Lists are handled with an order & a dictionary */ }
                      { /* `order` provides sequence todos should appear */ }
                      { /* `dict` provides a performant instance lookup */ }
                      {props$.map(todos => todos.order.map(key => (
                          <TodoItem props$={props$.map(todos => todos.dict[key])}
                                    key={key}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => {
                  return (
                  <div>
                      <h1>Todo App</h1>
                      { /* Individual attributes change in response to observables */}
                      { /* Performance can be optimized with `skipDuplicates` */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into JSX */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
                  )
              }
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          const view$ = mount(
              document.getElementById('app),
              <App props$={state$} />
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-17T19:04:18.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { h, component, mount, Kefir } from 'brookjs'


          // Changes are only bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      { /* Only change this text when a value is emitted */ }
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      { /* Lists are handled with an order & a dictionary */ }
                      { /* `order` provides sequence todos should appear */ }
                      { /* `dict` provides a performant instance lookup */ }
                      {props$.map(todos => todos.order.map(key => (
                          <TodoItem props$={props$.map(todos => todos.dict[key])}
                                    key={key}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => {
                  return (
                  <div>
                      <h1>Todo App</h1>
                      { /* Individual attributes change in response to observables */}
                      { /* Performance can be optimized with `skipDuplicates` */}
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      { /* Streams of events are embedded directly into the VDOM */}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
                  )
              }
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          const view$ = mount(
              document.getElementById('app),
              <App props$={state$.thru(mapState$toProps$) />
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-17T06:00:03.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { h, component, mount, Kefir } from 'brookjs'


          // Changes are only bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      { /* Only change this text when a value is emitted */ }
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      { /* Lists are handled by mapping over the arrays */ }
                      { /* Note that we have to provide a stream */ }
                      {props$.map(todos => todos.map((todo, i) => (
                          <TodoItem props$={props$.map(todos => todos.find(t => t.id === todo.id))}
                                    key={todo.id}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key: todo.id }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => {
                  return (
                  <div>
                      <h1>Todo App</h1>
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
                  )
              }
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          const view$ = mount(
              document.getElementById('app),
              <App props$={state$.thru(mapState$toProps$) />
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-16T23:09:27.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { component, mount, Kefir } from 'brookjs'


          // Changes are only bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      { /* Only change this text when a value is emitted */ }
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      { /* Lists are handled by mapping over the arrays */ }
                      { /* Note that we have to provide a stream */ }
                      {props$.map(todos => todos.map((todo, i) => (
                          <TodoItem props$={props$.map(todos => todos[i]}
                                    key={todo.id}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key: todo.id }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => {
                  return (
                  <div>
                      <h1>Todo App</h1>
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
                  )
              }
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          const view$ = mount(
              document.getElementById('app),
              <App props$={state$.thru(mapState$toProps$) />
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-16T21:45:36.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { component, mount, Kefir } from 'brookjs'


          // Changes are only bound to a stream

          const TodoItem = component({
              render: props$ => (
                  <div>
                      { /* Only change this text when a value is emitted */ }
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {props$.map(todo$ => todo$.map(todo => (
                          <TodoItem props$={todo$}
                                    key={todo.id}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key: todo.id }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => {
                  return (
                  <div>
                      <h1>Todo App</h1>
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
                  )
              }
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          const view$ = mount(
              document.getElementById('app),
              <App props$={state$.thru(mapState$toProps$) />
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-16T18:52:47.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: >-
          import { component, mount, Kefir } from 'brookjs'


          const TodoItem = component({
              render: props$ => (
                  <div>
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })


          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {props$.map(props => props.map(todo => (
                          <TodoItem props$={Kefir.constant(todo)}
                                    key={todo.id}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key: todo.id }
                                    })} />
                      )))}
                  </div>
              )
          })


          const App = component({
              render: props$ => {
                  return (
                  <div>
                      <h1>Todo App</h1>
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
                  )
              }
          })


          const store = createStore(reducer, initial,
          applyMiddleware(observeDelta(...deltas))

          const state$ = Kefir.fromESObservable(store)


          const view$ = mount(
              document.getElementById('app),
              <App props$={state$.thru(mapState$toProps$) />
           )
           
          view$.observe(store.dispatch)
        language: jsx
  - committedAt: '2017-12-10T05:39:21.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: |-
          import { component, mount } from 'brookjs'

          const TodoItem = component({
              render: props$ => (
                  <div>
                      <p>{props$.map(props => props.text)}</p>
                  </div>
              )
          })

          const TodoList = component({
              render: props$ => (
                  <div>
                      <h2>My Todos</h2>
                      {props$.map(props => props.map(todo => (
                          <TodoItem props$={Kefir.constant(todo)}
                                    key={todo.id}
                                    preplug={instance$ => instance$.map(action => ({
                                        ...action,
                                        meta: { key: todo.id }
                                    })} />
                      )))}
                  </div>
              )
          })

          const App = component({
              render: props$ => {
                  return (
                  <div>
                      <h1>Todo App</h1>
                      <input value={props$.map(props => props.editing).skipDuplicates()}
                             onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  </div>
                  )
              }
          })

          const view$ = mount(
              document.getElementById('app),
              <App props$={state$.thru(mapState$toProps$) />
           )
           
          view$.observe(val => {
              console.log(val)
          })
        language: jsx
  - committedAt: '2017-12-08T20:15:05.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: |-
          import { component } from 'brookjs'

          const TodoItem = component({
          })

          const TodoList = component({
              render(props$) {
                  return (
                      <h2>My Todos</h2>
                      {props$.map(props => props.map(todo => ()))}
                  )
              }
          })

          const App = component({
              render(props$) {
                  return (
                      <div>
                          <h1>Todo App</h1>
                          {props$.map(props => <input value={props.editing} onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />)}
                          <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                          <TodoList props$={props$.map(props => props.todos)} />
                      </div>
                  )
              }
          })
        language: jsx
  - committedAt: '2017-12-07T21:36:30.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: |-
          import { Component } from 'brookjs'

          class TodoList extends Component {
              render(props$) {
                  return (
                      <h2>My Todos</h2>
                      {props$.map(props => props.map((todo, i) => ()))}
                  )
              }
          }

          class App extends Component {
              render(props$) {
                  return (
                      <div>
                          <h1>Todo App</h1>
                          {props$.map(props => <input value={props.editing} onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />)}
                          <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                          <TodoList props$={props$.map(props => props.todos)} />
                      </div>
                  )
              }
          }
        language: jsx
  - committedAt: '2017-12-07T20:23:34.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: |-
          import { Component } from 'brookjs'

          class TodoList extends Component {
              render(props$) {
                  return (
                      <h2>My Todos</h2>
                      {props$.map(props =>
                  )
              }
          }

          class App extends Component {
              render(props$) {
                  return (
                      <div>
                          <h1>Todo App</h1>
                          {props$.map(props => <input value={props.editing} onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />)}
                          <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                          <TodoList props$={props$.map(props => props.todos)} />
                      </div>
                  )
              }
          }
        language: jsx
  - committedAt: '2017-12-07T20:13:30.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: |-
          import { Component } from 'brookjs'

          class TodoList extends Component {
          }

          class App extends Component {
              render(props$) {
                  return (
                      <h1>Todo App</h1>
                      {props$.map(props => <input value={props.editing} onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />)}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  )
              }
          }
        language: jsx
  - committedAt: '2017-12-07T20:09:26.000Z'
    description: Brookjs components strawman proposal
    blobs:
      - filename: component.js
        code: |-
          import { Component } from 'brookjs'

          class TodoList extends Component<TodoListProps, Action> {
          }

          class App extends Component<AppProps, Action> {
              render(props$: Observable<Props>): Brookjs.Element {
                  return (
                      <h1>Todo App</h1>
                      {props$.map(props => <input value={props.editing} onInput={evt$ => evt$.map(e => editTodo(e.target.value))} />)}
                      <button onClick={evt$ => evt$.map(addTodo)}>Add Todo</button>
                      <TodoList props$={props$.map(props => props.todos)} />
                  )
              }
          }
        language: jsx
---

