import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { todoList } from "../../lib/store/todo/todo.slice";
import TodoForm from "./__components__/TodoForm";
import TodoItem from "./__components__/TodoItem";

export default function TodoImpl() {
  const list = useSelector(todoList);
  return (
    <TodoLayout>
      <Title>TODO</Title>
      <TodoForm />
      <List>
        {list.map((item) => (
          <TodoItem key={item._id} item={item} />
        ))}
      </List>
    </TodoLayout>
  );
}

const TodoLayout = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1``;

const List = styled.ul``;
