import { createNote, getNotes, getNoteById, updateNote, deleteNote } from "./notes.service.js";

export const create = async (req, res) => {
    try {
        const note = await createNote(req.body, req.user.id);
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ error:err.message });
    }
};

// export const list = async (req, res) => {
//     try {
//         const notes = await getNotes(req.user.id);
//         res.json(notes);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

export const list = async (req, res) => {
    try {
        const options = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            completed:
                req.query.completed !== undefined
                ? req.query.completed === "true"
                : undefined,
            sort: req.query.sort,
        };

        const result = await getNotes(req.user.id, options);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getOne = async (req, res) => {
    try {
        const note = await getNoteById(req.params.id, req.user.id);
        res.json(note);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const note = await updateNote(
            req.params.id,
            req.user.id,
            req.body
        );
        res.json(note);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

export const remove = async (req, res) => {
    try {
      await deleteNote(req.params.id, req.user.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };