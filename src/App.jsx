import { useEffect, useReducer } from "react"
import Controls from "./components/Controls"
import Layout from "./components/Layout"
import Title from "./components/Title"
import TodoList from "./components/TodoList"
import { ADD_TODO, DELETE_TODO, DELETE_TODO_COMPLETED, init, initialState, reducer, SET_FILTER, TOGGLE_TODO, TOGGLE_TODO_ALL, UPDATE_TODO } from "./reducer"

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, init)
  
  useEffect(() => {
    window.localStorage.setItem('TODO', JSON.stringify(state.list))
    window.localStorage.setItem('ID', JSON.stringify(state.id))
  })
  //          function: 필터 종류 변경 이벤트 처리 함수          //
  const handleChangeFilterType = (type) => {
    dispatch({ type: SET_FILTER, payload: type})
  }
  //          function: TodoItem 추가 이벤트 처리 함수          //
  const handleSubmit = (value) => {
    dispatch({ type: ADD_TODO, payload: value})
  }
  //          function: TodoItem 체크 변경 이벤트 처리 함수          //
  const handleToggle = (id) => {
    dispatch({ type: TOGGLE_TODO, payload: id})
  }
  //          function: TodoItem 전체 변경 이벤트 처리 함수          //
  const handleToggleAll = (flag) => {
    dispatch({ type: TOGGLE_TODO_ALL, payload: flag})
  }
  //          function: TodoItem 삭제 이벤트 처리 함수          //
  const handleDelete = (id) => {
    dispatch({ type: DELETE_TODO, payload: id})
  }
  //          function: TodoItem 삭제 완료 이벤트 처리 함수          //
  const handleDeleteCompleted = () => {
    dispatch({ type: DELETE_TODO_COMPLETED})
  }
  //          function: TodoItem 수정 이벤트 처리 함수          //
  const handleUpdate = (id, text) => {
    dispatch({ type: UPDATE_TODO, payload: {id, text} })
  }

  const filteredList = state.list.filter((item) => {
    switch (state.filterType){
      case "TODO":
        return !item.completed
      case "COMPLETED":
        return item.completed
      default:
        return true
    }
  })
  //          render: Application 컴포넌트 렌더링          //
  return (
    <Layout>
        <Title />
        <Controls filterType={state.filterType} onChangeFilterType={handleChangeFilterType} onSubmit={handleSubmit}/>
        <TodoList data={filteredList} onToggle={handleToggle} onToggleAll={handleToggleAll} onDelete={handleDelete} onDeleteCompleted={handleDeleteCompleted} onUpdate={handleUpdate}/>
      </Layout>

  )
}

export default App
