import { constants } from "./constants";

export interface TodoTask {
  completed: boolean;
  _id: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddTaskInterface {
  data: TodoTask;
}

export default async function addTask(task: string): Promise<AddTaskInterface> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${constants.token}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      description: task,
    }),
  };

  const response = await fetch(`${constants.url}/task`, requestOptions);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { data } = await response.json();
  return { data };
}
