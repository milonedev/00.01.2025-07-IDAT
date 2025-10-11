// const express = require("express");
import express from "express";

const router = express.Router();


router.get("/", (req, res) => {
    return res.send("Comments works");
});

export default router;