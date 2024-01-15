import cassandraDb from "@/cassandra";
import { formSchema } from "@/lib/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import * as z from 'zod'

export async function GET (req: Request) {

    try {
        const query = `SELECT * FROM todos`;

        const data = (await cassandraDb.execute(query, [], { prepare: true })).rows.map((row ) => ({
            id: row.todo_id?.toString(),
            title: row.todo,
            userId: row.user_id
        }))


        return NextResponse.json(data)


        
    } catch (error) {

        console.log('TODO_ROUTE_ERROR', error);
        return new NextResponse('Something went wrong', { status: 500 })
        
    }

};


// ADDING DATA

export async function POST (req: Request) {
    try {
        const { userId } = auth()
        const values = await req.json();
        const todoId = crypto.randomUUID();

        const validatedFields = formSchema.safeParse(values);
        if(!validatedFields.success) {
            return new NextResponse('Invalid fields!', { status: 400 })
        };

        const { todo } = validatedFields.data;
        
        
        
        

        const query = `INSERT INTO todos (todo_id, todo, user_id) VALUES (?, ?, ?)`;

        await cassandraDb.execute(query, [todoId, todo, userId], { prepare: true });

        return NextResponse.json({ success: todo  })


        
    


        
    } catch (error) {
        console.log('TODO_ROUTE_ERROR', error);
        return new NextResponse('Something went wrong', { status: 500 })
        
    
        
    }
}