import { faker } from "@faker-js/faker";
import { users } from "../../database/schema.ts";
import { hash } from "argon2";
import { db } from "../../database/client.ts";
import { randomUUID } from "node:crypto";

type UserRole = 'student' | 'teacher' | 'manager';

export async function makeUser(role: UserRole = 'student') {
    const passwordWithHash = randomUUID();
    const result = await db.insert(users).values({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hash(passwordWithHash),
        role: role
    }).returning()

    return {
        user: result[0],
        password: passwordWithHash
    };
}

export async function makeUserOnly(role: UserRole = 'student') {
    const passwordWithHash = randomUUID();
    const result = await db.insert(users).values({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hash(passwordWithHash),
        role: role
    }).returning()

    return result[0];
}