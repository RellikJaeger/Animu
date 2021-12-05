const createError = require('http-errors')
const requestIp = require('request-ip')
const moment = require('moment')
const Happy = require('../../models/schemas/Happy')

// Get random Anime Happy
module.exports = async function getRandomHappy(req, res, next) {
  try {
    const [result] = await Happy.aggregate([
      // Select a random document from the results
      { $sample: { size: 1 } },
      { $project: { __v: 0, _id: 0 } },
    ])

    if (!result) {
      return next(createError(404, 'Could not find any Happy Gif'))
    }

    res.status(200).json(result)
    console.log(
      `${req.method} | ${moment(Date.now()).format()} ${requestIp.getClientIp(
        req
      )} to ${req.path} - ${JSON.stringify(req.query)}`
    )
  } catch (error) {
    return next(error)
  }
}
