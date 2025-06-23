const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const SuggestTerm = require('./../Models/suggestedTerm.js');
const RedisClient = require('./../Services/Redis.js');

// middleware to handle cookie fingerprint
// middleware to handle redis state
// middleware to handle the req, check data, send res

const fingerPrint = async (req, res, next) => {
  let id;
  if (!req.cookies.fingerprint) {
    // first request today
    id = uuidv4();
    res.cookie('fingerprint', id, {
      maxAge: process.env.fingerprint_EXP_PERIOD,
    });
    req.cookies.fingerprint = id;
  }
  return next();
};
const redisHandler = async (req, res, next) => {
  id = req.cookies.fingerprint;
  // if already saved before

  const used = await RedisClient.get(id);
  if (!used) {
    // it has no key in Redis
    await RedisClient.set(id, 0, {
      EX: 86400,
    });
  } else {
    // already exist
    if (used >= process.env.fingerprint_MAX_USAGE) {
      return res.status(429).json({
        status: 'error',
        message: 'Too Many Requests',
      });
    }
  }
  req.body.used = used;
  return next();
};
const controller = async (req, res) => {
  try {
    if (!req.body.definition || !req.body.term) {
      return res.status(400).json({
        status: 'error',
        message: 'missing term or definition',
      });
    }
    usedTimes = req.body.used;
    // DB
    let suggestTerm = new SuggestTerm();
    suggestTerm.definition = req.body.definition;
    suggestTerm.term = req.body.term;
    suggestTerm = await suggestTerm.save();

    // increase his used
    await RedisClient.incr(id);
    const TTL = await RedisClient.ttl(id);

    return res.status(201).json({
      status: 'success',
      data: {
        definition: suggestTerm.definition,
        term: suggestTerm.term,
        remaining_times: process.env.fingerprint_MAX_USAGE - usedTimes - 1,
        time_to_live: TTL,
      },
    });
  } catch (e) {
    console.log(e);
    return res.json({
      error: true,
      message: e.message,
    });
  }
};

router.post('/', [fingerPrint, redisHandler, controller]);
module.exports = router;
