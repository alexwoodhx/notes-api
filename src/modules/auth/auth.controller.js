import { registerUser, loginUser } from "./auth.service.js";

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "User created", userId: user._id});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { user, token } = await loginUser(req.body);
        res.json({ token });
    } catch (err) {
        res.status(400).json ({ error: err.message});
    }
}