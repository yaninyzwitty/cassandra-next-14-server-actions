"use server";

import cassandraDb from "@/cassandra";

export const queryTodos = async () => {
    const query = `SELECT * FROM todos`;

    const data = (await cassandraDb.execute(query, [], { prepare: true })).rows.map((row ) => ({
        id: row.todo_id?.toString(),
        title: row.todo,
        userId: row.user_id
    }));


    return data ;


    

}