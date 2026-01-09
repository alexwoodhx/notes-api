import Note from "./note.model.js";

export const createNote = async ({ title, content, tags }, userId) => {
  return Note.create({
    title,
    content,
    tags,
    user: userId,
  });
};

export const getNotes = async (userId) => {
  return Note.find({ user: userId }).sort({ createdAt: -1 });
};

export const getNoteById = async (noteId, userId) => {
  const note = await Note.findOne({ _id: noteId, user: userId });
  if (!note) throw new Error("Note not found");
  return note;
};

export const updateNote = async (noteId, userId, updates) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    updates,
    { new: true }
  );

  if (!note) throw new Error("Note not found");
  return note;
};

export const deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user: userId });
  if (!note) throw new Error("Note not found");
};
