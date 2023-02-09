const {
  list_users,
  get_user_with_tweets,
  close_db, // Out of scope for testing
} = require('./handlers');

afterAll(() => {
  close_db();
});

test('list_users() returns all users', async () => {
  // pre-populated - these are definitely all users
  const all_users = [ 'user_a', 'user_b', 'user_c' ].sort();
  const users = await list_users();
  const received_usernames = users.map((user) => user.username).sort();
  expect(received_usernames).toEqual(all_users);
});

test('get_user_with_tweets(user_a) returns user_a with their tweets', async () => {
  // Pre-populated - this expectation is definitely correct
  const expected_subset = {
    'username': 'user_a',
    'tweets': [
      {
        content: 'I am User A. Nice to meet you!',
      },
    ],
  };
  const user_with_tweets = await get_user_with_tweets('user_a');
  expect(user_with_tweets).toMatchObject(expected_subset);
});

test('get_user_with_tweets(user_b) returns user_b with their tweets', async () => {
  // Pre-populated - this expectation is definitely correct
  const expected_subset = {
    'username': 'user_b',
    'tweets': [
      {
        content: 'Hi all. This is User B.',
      },
      {
        content: 'I am the second user in this platform!',
      }
    ],
  };
  const user_with_tweets = await get_user_with_tweets('user_b');
  expect(user_with_tweets).toMatchObject(expected_subset);
});

test('get_user_with_tweets(user_c) returns user_c with their tweets', async () => {
  // Pre-populated - this expectation is definitely correct
  const expected_subset = {
    'username': 'user_c',
    'tweets': [], // no tweets from user_c
  };
  const user_with_tweets = await get_user_with_tweets('user_c');
  expect(user_with_tweets).toMatchObject(expected_subset);
});
