CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE tweets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    content VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO users (username) VALUES ('user_a'), ('user_b'), ('user_c');

INSERT INTO tweets (user_id, content)
SELECT id, 'I am User A. Nice to meet you!' FROM users WHERE username = 'user_a';

INSERT INTO tweets (user_id, content)
SELECT id, 'Hi all. This is User B.' FROM users WHERE username = 'user_b';

INSERT INTO tweets (user_id, content)
SELECT id, 'I am the second user in this platform!' FROM users WHERE username = 'user_b';
