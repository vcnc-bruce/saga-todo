import { constants } from "./constants";

export interface addTaskInterface {
  data?: any;
  errors?: any;
}

export default async function addTask(task: string): Promise<addTaskInterface> {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGRjY2JlYzZiNTVkYTAwMTc1OTcyMmMiLCJpYXQiOjE1NzQ3NTE2ODh9.GPbsl9FLX4VrsGVErodiXypjuz1us4tfD0jwg2_UrzY"
  );
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      description: task,
    }),
  };

  const response = await fetch(`${constants.url}/task`, requestOptions);
  const { data, errors } = await response.json();
  return { data, errors };
}
