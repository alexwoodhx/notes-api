import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
  } from "./notes.service.js";
  
  import { asyncHandler } from "../../utils/asyncHandler.js";
  
  export const create = asyncHandler(async (req, res) => {
    const note = await createNote(req.body, req.user.id);
    res.status(201).json(note);
  });
  
  export const list = asyncHandler(async (req, res) => {
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
  });
  
  export const getOne = asyncHandler(async (req, res) => {
    const note = await getNoteById(req.params.id, req.user.id);
    res.json(note);
  });
  
  export const update = asyncHandler(async (req, res) => {
    const note = await updateNote(
      req.params.id,
      req.user.id,
      req.body
    );
    res.json(note);
  });
  
  export const remove = asyncHandler(async (req, res) => {
    await deleteNote(req.params.id, req.user.id);
    res.status(204).send();
  });
  