import { TTask } from "@/@types/schema";
import { API_URL } from "./config";

// export async function getTask(): Promise<TDesk[]> {
//   const res = await fetch(`${API_URL}/tasks`);
//   return res.json();
// }

// export async function getTaskById(id: string): Promise<TDesk> {
//   const res = await fetch(`${API_URL}/tasks/${id}`);
//   return res.json();
// }

export async function createTask({
  title,
  description,
  checked,
  deskId,
}: {
  title: string;
  description: string;
  checked: boolean;
  deskId: string;
}): Promise<TTask[]> {
  const res = await fetch(`${API_URL}/desks/${deskId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      checked,
    }),
  });
  return res.json();
}

export async function deleteTask({ taskId, deskId }: any) {
  await fetch(`${API_URL}/desks/${deskId}/tasks/${taskId}`, {
    method: "DELETE",
  });
}

export async function editTask(
  deskId: string,
  newTaskData: TTask
) {
  await fetch(`${API_URL}/desks/${deskId}/tasks/${newTaskData._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newTaskData,
    }),
  });
}
