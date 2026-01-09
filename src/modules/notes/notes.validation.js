import { body, param } from "express-validator";

// Validation rules for creating a note
export const createNoteValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be at most 100 characters"),
  
  body("content")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Content must be at most 5000 characters"),
  
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags) => {
      if (tags && tags.some((tag) => typeof tag !== "string")) {
        throw new Error("All tags must be strings");
      }
      return true;
    }),
  
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];

// Validation rules for updating a note
export const updateNoteValidation = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Title must be at most 100 characters"),
  
  body("content")
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Content must be at most 5000 characters"),
  
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((tags) => {
      if (tags && tags.some((tag) => typeof tag !== "string")) {
        throw new Error("All tags must be strings");
      }
      return true;
    }),
  
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];

// Validation rules for note ID parameter
export const noteIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid note ID format"),
];

