CREATE TABLE IF NOT EXISTS todos (
    todo_id UUID PRIMARY KEY,
    user_id TEXT,
    todo TEXT
) -- function post todo
;