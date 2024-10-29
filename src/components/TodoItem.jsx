import { useContext, useState } from 'react'
import { DELETE_TODO, TOGGLE_TODO, UPDATE_TODO } from '../reducer';
import { TodoContext } from '../context';

const itemClassName = `flex items-center h-[65px] gap-[12px] px-[12px] py-[0px]`
const checkboxClassName = `w-[16px] h-[16px]`
const textClassName = `grow`
const buttonClassName = `w-[32px] h-[30px] bg-white text-black border-none`
const inputClassName = `grow border-[1px] border-solid border-gray-500 rounded-[6px] bg-transparent px-[12px] py-[4px] text-[14px] leading-[20px] text-black `

function TodoItem({ id, text, completed }) {
  const { dispatch } = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit((prev) => !prev)
  }
  const handleChange = (e) => {
    dispatch({type: UPDATE_TODO, payload: {id, text: e.target.value}})
  }
  const handleToggle = () => {
    dispatch({type: TOGGLE_TODO, payload: id})
  }
  const handleDelete = () => {
    dispatch({type: DELETE_TODO, payload: id})
  }
  return (
    <div className={itemClassName}>
      <input type="checkbox" className={checkboxClassName} checked={completed} onChange={handleToggle} />
      {edit ? <input className={inputClassName} value={text} onChange={handleChange} /> : <p className={[textClassName, completed && 'line-through'].join(' ')}>{text}</p>}
      <button className={buttonClassName} onClick={handleEdit}>수정</button>
      <button className={buttonClassName} onClick={handleDelete}>삭제</button>
    </div>
  )
}

export default TodoItem