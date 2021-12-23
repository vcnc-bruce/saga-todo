import { constants } from "./constants";

export interface DeleteTaskInterface {
  data: any;
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
  const { data } = await response.json();
  return { data };
}
