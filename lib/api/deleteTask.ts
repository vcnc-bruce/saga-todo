import { constants } from "./constants";

export interface TodoTask {
  completed: boolean;
  _id: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeleteTaskInterface {
  data?: any;
  errors?: any;
}

export default async function deleteTask(
  id: string
): Promise<DeleteTaskInterface> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${constants.token}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
  };

  const response = await fetch(`${constants.url}/task/${id}`, requestOptions);
  const { data, errors } = await response.json();
  return { data, errors };
}
