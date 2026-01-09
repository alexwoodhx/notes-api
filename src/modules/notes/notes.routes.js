import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
    create,
    list,
    getOne,
    update,
    remove
} from "./notes.controller.js";
import {
    createNoteValidation,
    updateNoteValidation,
    noteIdValidation
} from "./notes.validation.js";

const router = Router();

//implement middleware for protection
router.use(authMiddleware);

router.post("/", createNoteValidation, validate, create);
router.get("/", list);
router.get("/:id", noteIdValidation, validate, getOne);
router.put("/:id", noteIdValidation, updateNoteValidation, validate, update);
router.delete("/:id", noteIdValidation, validate, remove);

export default router;