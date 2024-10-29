import Controls from "./components/Controls"
import Layout from "./components/Layout"
import Title from "./components/Title"
import TodoList from "./components/TodoList"
import { TodoProvider } from "./context"

function App() {
  
  //          render: Application 컴포넌트 렌더링          //
  return (
    <TodoProvider>
      <Layout>
        <Title />
        <Controls />
        <TodoList />
      </Layout>
    </TodoProvider>

  )
}

export default App
