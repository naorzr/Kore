// db.ts
import { openDB } from "idb";

export async function getDB() {
  return await openDB("ReadingApp", 1, {
    upgrade(db) {
      db.createObjectStore("progress");
      db.createObjectStore("readings", { keyPath: "title" });
    },
  });
}

export async function getTotalPoints(): Promise<number> {
  const db = await getDB();
  return (await db.get("progress", "totalPoints")) || 0;
}

export async function setTotalPoints(points: number): Promise<void> {
  const db = await getDB();
  await db.put("progress", points, "totalPoints");
}

export async function saveCompletedReading(
  title: string,
  questionsCompleted: string[],
): Promise<void> {
  const db = await getDB();
  const completedAt = new Date().toISOString();
  await db.put("readings", { title, completedAt, questionsCompleted });
}

export async function getCompletedReadings(): Promise<any[]> {
  const db = await getDB();
  return await db.getAll("readings");
}
