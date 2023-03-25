import { TDesk } from "@/@types/schema";
import { API_URL } from "./config";

export async function getDesks(): Promise<TDesk[]> {
  const res = await fetch(`${API_URL}/desks`);
  return res.json();
}

export async function getDesksById(id: string): Promise<TDesk> {
  const res = await fetch(`${API_URL}/desks/${id}`);
  return res.json();
}

export async function createDesk(title: string): Promise<TDesk> {
  const res = await fetch(`${API_URL}/desks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });
  return res.json();
}

export async function deleteDesk(deskId: string) {
  await fetch(`${API_URL}/desks/${deskId}`, {
    method: "DELETE",
  });
}

export async function editDesk(deskId: string, newTitle: string) {
  await fetch(`${API_URL}/desks/${deskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  });
}
