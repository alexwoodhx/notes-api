import Note from "./note.model.js";

export const createNote = async ({ title, content, tags }, userId) => {
  return Note.create({
    title,
    content,
    tags,
    user: userId,
  });
};

// export const getNotes = async (userId) => {
//   return Note.find({ user: userId }).sort({ createdAt: -1 });
// };

export const getNotes = async (userId, options = {}) => {
  const {
    page = 1,
    limit = 10,
    completed,
    sort = "createdAt:desc",
  } = options;

  const query = { user: userId };

  if (completed !== undefined) {
    query.completed = completed;
  }

  const [sortField, sortOrder] = sort.split(":");
  const sortBy = { [sortField]: sortOrder === "asc" ? 1: -1};

  const skip = (page - 1) * limit;

  const notes = await Note.find(query)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  const total = await Note.countDocuments(query);

  return {
    data: notes,
    meta: {
      total,
      page,
      pages: Math.ceil(total / limit),
    }
  }
}

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
