import express, { Router } from "express";

const router = express.Router()

router.get('/test', (req, res) => {
    res.json({ success: true })
})

export default router