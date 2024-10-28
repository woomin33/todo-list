import { useRef, useState } from "react"
import Controls from "./components/Controls"
import Layout from "./components/Layout"
import Title from "./components/Title"
import TodoList from "./components/TodoList"

function App() {
  //          state: 아이디 참조 상태          //
  const idRef = useRef(0);
  //          state: 할일 리스트 상태          //
  const [list, setList] = useState([]);
  //          state: 필터 종류 상태          //
  const [filterType, setFilterType] = useState("ALL")
  //          function: 필터 종류 변경 이벤트 처리 함수          //
  const handleChangeFilterType = (filter) => {
    setFilterType(filter)
  }
  //          function: TodoItem 추가 이벤트 처리 함수          //
  const handleSubmit = (value) => {
    setList((prevList) => 
      prevList.concat({
        id: (idRef.current += 1),
        text: value,
        completed: false,
      })
    )
  }
  //          function: TodoItem 체크 변경 이벤트 처리 함수          //
  const handleToggle = (id) => {
    setList((prevList) => prevList.map(item => {
      if(item.id === id) {
        return {...item, completed: !item.completed}
      }
      return item
    }))
  }
  //          function: TodoItem 전체 변경 이벤트 처리 함수          //
  const handleToggleAll = (flag) => {
    setList((prevList) => prevList.map(item => ({...item, completed: flag})))
  }
  //          function: TodoItem 삭제 이벤트 처리 함수          //
  const handleDelete = (id) => {
    setList((prevList) => prevList.filter(item => item.id !== id))
  }
  //          function: TodoItem 삭제 완료 이벤트 처리 함수          //
  const handleDeleteCompleted = () => {
    setList((prevList) => prevList.filter((item) => !item.completed))
  }
  //          function: TodoItem 수정 이벤트 처리 함수          //
  const handleUpdate = (id, text) => {
    setList((prevList) => prevList.map((item) => {
      if(item.id === id){
        return { ...item, text }
      }
      return item
    }))
  }
  const filteredList = list.filter((item) => {
    if(filterType === "ALL"){
      return item;
    } else if(filterType === "TODO"){
      return !item.completed
    } else{
      return item.completed
    }
  })
  //          render: Application 컴포넌트 렌더링          //
  return (
    <Layout>
        <Title />
        <Controls filterType={filterType} onChangeFilterType={handleChangeFilterType} onSubmit={handleSubmit}/>
        <TodoList data={filteredList} onToggle={handleToggle} onToggleAll={handleToggleAll} onDelete={handleDelete} onDeleteCompleted={handleDeleteCompleted} onUpdate={handleUpdate}/>
      </Layout>

  )
}

export default App
