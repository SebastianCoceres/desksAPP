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
  desk,
}: {
  title: string;
  description: string;
  checked: boolean;
  desk: string;
}): Promise<TTask> {
  const res = await fetch(`${API_URL}/desks/${desk}/tasks`, {
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

// export async function editTask(deskId: string, newTitle: string) {
//   await fetch(`${API_URL}/tasks/${deskId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       title: newTitle,
//     }),
//   });
// }
