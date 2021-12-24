import styled from "@emotion/styled";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../lib/store/todo/todo.slice";

export default function TodoForm() {
  const dispatch = useDispatch();
  const [input, setInput] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };
  const onAddButtonClick = () => {
    dispatch(todoActions.requestFlowAddTodo({ contents: input }));
    setInput("");
  };
  return (
    <div>
      <input type="text" onChange={onChange} value={input} />
      <button onClick={onAddButtonClick}>ADD</button>
    </div>
  );
}
