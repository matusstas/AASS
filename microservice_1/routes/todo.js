'use strict';

const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    var result = "todo";
    res.send(result).status(200);
  });

module.exports = router
