import mongoose from "mongoose";
import { env } from "../src/config/env.js";
import Note from "../src/modules/notes/note.model.js";

const USER_ID = "real user id here";

const seedNotes = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("MongoDB connected");

    await Note.deleteMany({ user: USER_ID });

    const notes = [
      {
        title: "Buy groceries",
        content: "Milk, eggs, bread",
        completed: false,
        tags: ["personal", "shopping"],
        user: USER_ID,
      },
      {
        title: "Finish backend project",
        content: "Complete pagination and error handling",
        completed: false,
        tags: ["work", "coding"],
        user: USER_ID,
      },
      {
        title: "Read a book",
        content: "Continue reading Clean Architecture",
        completed: true,
        tags: ["personal"],
        user: USER_ID,
      },
      {
        title: "Workout",
        content: "30 minutes cardio",
        completed: true,
        tags: ["health"],
        user: USER_ID,
      },
      {
        title: "Plan weekend trip",
        content: "Look at trains and hotels",
        completed: false,
        tags: ["planning"],
        user: USER_ID,
      },
    ];

    await Note.insertMany(notes);

    console.log("Notes seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedNotes();
