import { faker } from "@faker-js/faker";
import { users } from "../../database/schema.ts";
import { hash } from "argon2";
import { db } from "../../database/client.ts";
import { randomUUID } from "node:crypto";


export async function makeUser() {
    const passwordWithHash = randomUUID();
    const result = await db.insert(users).values({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hash(passwordWithHash)
    }).returning()

    return {
        user: result[0],
        password: passwordWithHash
    }

}