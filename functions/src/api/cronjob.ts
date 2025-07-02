import { onSchedule } from "firebase-functions/scheduler";

export const cronjob = onSchedule("every day 00:00", async () => {
    console.log("This is a function that runs every day.")
})