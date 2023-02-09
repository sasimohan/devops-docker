"use strict";

// Knex is a Query Builder library
const knex = require("knex")({
  client: "pg", // PostgreSQL
  connection: {
    host: process.env.DB_HOST_NAME || "localhost",
    user: "api_access_user",
    password: "I_am_quite_a_strong_password!",
    database: "live_coding_challenge",
    port: 5432,
  },
});

// Type Definitions

/**
 * @typedef User
 * @type {id: number, username: string, created_at: date}
 */

/**
 * @typedef UserWithTweets
 * @type {id: number, username: string, created_at: date, tweets: Tweet[]}
 */

/**
 * @typedef Tweet
 * @type {id: number, user_id: number, content: string, created_at: date}
 */

async function show_api_info() {
  return {
    version: "1.0.0",
    name: "DevOps Live Coding Challenge API",
  };
}

/**
 * @returns {Promise<User[]>}
 */
async function list_users() {
  const users = await get_all_users();
  return users;
}

/**
 * @param {string} username
 * @returns {Promise<UserWithTweets>}
 */
async function get_user_with_tweets(username) {
  // Don't need to change the following two lines. It retrieves all data but ignore optimisation.
  const users = await get_all_users();
  const tweets = await get_all_tweets();

  console.log(users);
  console.log(tweets);
  // Your code goes below.
  // Find the user with the matching username
  const user = users.find((u) => u.username === username);
  if (!user) {
    return {
      status: false,
      message: `User with username ${username} not found.`,
    };
  }

  // Filter tweets to only include those belonging to the desired user
  const userTweets = tweets.filter((t) => t.user_id === user.id);

  // Combine the user and their tweets into a single object
  return { ...user, tweets: userTweets };
}

// DB Access - For simplicity, it returns all the records at once.
// Don't need to worry about the optimisation here.

/**
 * @returns {Promise<User[]>}
 */
async function get_all_users() {
  const rows = await knex("users").select("*");
  return rows;
}

/**
 * @returns {Promise<Tweet[]>}
 */
async function get_all_tweets() {
  const rows = await knex("tweets").select("*");
  return rows;
}

function close_db() {
  knex.destroy();
}

module.exports = {
  show_api_info,
  list_users,
  get_user_with_tweets,
  close_db,
};
