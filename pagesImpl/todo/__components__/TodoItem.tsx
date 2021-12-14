import styled from "@emotion/styled";
import { Task } from "../../../lib/store/todo/todo.slice";

interface TodoItemProps {
  item: Task;
}

export default function TodoItem({ item }: TodoItemProps) {
  return (
    <ItemLayout>
      <Text>{item.description}</Text>
      <DeleteButton>X</DeleteButton>
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
