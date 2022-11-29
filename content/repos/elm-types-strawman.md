---
description: elm-types Strawman
status: publish
gistId: ''
sync: false
createdAt: '2018-05-11T11:23:14.000Z'
updatedAt: '2018-12-02T23:42:39.000Z'
blobs:
  - filename: with-react-redux.js
    code: >-
      import t from 'elm-types';


      const AddTodo = t.Constructor('AddTodo', [t.String]);

      const RemoveTodo = t.Constructor('AddTodo', [t.String]);

      const Action = t.Union('Action', [AddTodo]);

      const Todo = t.Record('Todo', {
          name: t.String,
          completed: t.Bool
      });

      const Model = t.Record('Model', {
          todos: t.List('todos', Todo)
      });


      // Throws if function is not passed correct parameter types

      const update = t.Function('update', [Model, Action, Model], (state,
      action) =>
          // Throws if last object is not exaustive
          t.case(action, Action, {
              [AddTodo]: add => ({
                  ...state,
                  todos: [...state.todos, Todo(add, false)]
              }),
              [RemoveTodo]: remove => ({
                  ...state,
                  todos: state.todos.filter(todo => todo.name === remove)
              })
          });
      );


      const store = createStore(update, Model([]));


      const App = ({ todos }) => (
          <div>
              <h1>Todo List</h1>
              <ul>
                  {todos.map(todo => (
                      <li onClick={() => store.dispatch(RemoveTodo(todo.name))}>
                          {todo.name}
                      </li>
                  ))}
              </ul>
          </div>
      );


      const AppProps = t.Record('AppProps', {
          todos: t.List('todos', Todo)
      });


      App.propTypes = t.PropTypes(AppProps);


      render(
          <App {...store.getState()} />,
          document.getElementById('app')
      );
    language: js
commits:
  - committedAt: '2018-12-03T04:42:39.000Z'
    description: elm-types Strawman
    blobs:
      - filename: with-react-redux.js
        code: >-
          import t from 'elm-types';


          const AddTodo = t.Constructor('AddTodo', [t.String]);

          const RemoveTodo = t.Constructor('AddTodo', [t.String]);

          const Action = t.Union('Action', [AddTodo]);

          const Todo = t.Record('Todo', {
              name: t.String,
              completed: t.Bool
          });

          const Model = t.Record('Model', {
              todos: t.List('todos', Todo)
          });


          // Throws if function is not passed correct parameter types

          const update = t.Function('update', [Model, Action, Model], (state,
          action) =>
              // Throws if last object is not exaustive
              t.case(action, Action, {
                  [AddTodo]: add => ({
                      ...state,
                      todos: [...state.todos, Todo(add, false)]
                  }),
                  [RemoveTodo]: remove => ({
                      ...state,
                      todos: state.todos.filter(todo => todo.name === remove)
                  })
              });
          );


          const store = createStore(update, Model([]));


          const App = ({ todos }) => (
              <div>
                  <h1>Todo List</h1>
                  <ul>
                      {todos.map(todo => (
                          <li onClick={() => store.dispatch(RemoveTodo(todo.name))}>
                              {todo.name}
                          </li>
                      ))}
                  </ul>
              </div>
          );


          const AppProps = t.Record('AppProps', {
              todos: t.List('todos', Todo)
          });


          App.propTypes = t.PropTypes(AppProps);


          render(
              <App {...store.getState()} />,
              document.getElementById('app')
          );
        language: js
  - committedAt: '2018-05-11T15:23:14.000Z'
    description: elm-types Strawman
    blobs:
      - filename: with-react-redux.js
        code: >-
          import t from 'elm-types';


          const AddTodo = t.Constructor('AddTodo', [t.String]);

          const RemoveTodo = t.Constructor('AddTodo', [t.String]);

          const Action = t.Union('Action', [AddTodo]);

          const Todo = t.Record('Todo', {
              name: t.String,
              completed: t.Bool
          });

          const Model = t.Record('Model', {
              todos: t.List('todos', Todo)
          });


          // Throws if function is not passed correct parameter types

          const update = t.Function('update', [State, Action, State], (state,
          action) =>
              // Throws if last object is not exaustive
              t.case(action, Action, {
                  [AddTodo]: add => ({
                      ...state,
                      todos: [...state.todos, Todo(add, false)]
                  }),
                  [RemoveTodo]: remove => ({
                      ...state,
                      todos: state.todos.filter(todo => todo.name === remove)
                  })
              });
          );


          const store = createStore(update, Model([]));


          const App = ({ todos }) => (
              <div>
                  <h1>Todo List</h1>
                  <ul>
                      {todos.map(todo => (
                          <li onClick={() => store.dispatch(RemoveTodo(todo.name))}>
                              {todo.name}
                          </li>
                      ))}
                  </ul>
              </div>
          );


          const AppProps = t.Record('AppProps', {
              todos: t.List('todos', Todo)
          });


          App.propTypes = t.PropTypes(AppProps);


          render(
              <App {...store.getState()} />,
              document.getElementById('app')
          );
        language: js
---

