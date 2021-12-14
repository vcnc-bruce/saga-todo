import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../lib/store/todo/todo.slice";

export default function TodoForm() {
  const dispatch = useDispatch();

  const onAddButtonClick = () => {
    dispatch(todoActions.requestAddTodo);
  };
  return (
    <div>
      <input type="text"></input>
      <button onClick={onAddButtonClick}>ADD</button>
    </div>
  );
}
