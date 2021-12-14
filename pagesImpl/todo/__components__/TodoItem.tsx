import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { TodoTask } from "../../../lib/api/addTask";
import { todoActions } from "../../../lib/store/todo/todo.slice";

interface TodoItemProps {
  item: TodoTask;
}

export default function TodoItem({ item }: TodoItemProps) {
  const dispatch = useDispatch();

  const onDeleteButtonClick = () => {
    dispatch(todoActions.requestDeleteTodo({ todoId: item._id }));
  };

  return (
    <ItemLayout>
      <Text>{item.description}</Text>
      <DeleteButton onClick={onDeleteButtonClick}>X</DeleteButton>
    </ItemLayout>
  );
}

const ItemLayout = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
`;
const Text = styled.div``;
const DeleteButton = styled.button``;
