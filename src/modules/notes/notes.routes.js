import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import {
    create,
    list,
    getOne,
    update,
    remove
} from "./notes.controller.js";

const router = Router();

//implement middleware for protection
router.use(authMiddleware);

router.post("/", create);
router.get("/", list);
router.get("/:id", getOne);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;