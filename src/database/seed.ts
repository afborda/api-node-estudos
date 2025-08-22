import { time } from "console";
import { db } from "./client.ts";
import { enrollments, users, courses } from "./schema.ts";
import { fakerPT_BR as faker } from '@faker-js/faker'
import { hash } from "argon2";

async function seed() {

    const passwordHash = await hash('123456');
    const usersInsert = await db.insert(users).values([
        {
            name: 'Heitor Franco',
            email: 'heitor.franco6@live.com',
            role: 'student',
            password: passwordHash,
        },
        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'teacher',
            password: passwordHash,
        },
        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'manager',
            password: passwordHash,
        },
        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            role: 'student',
            password: passwordHash
        },

    ]).returning()

    const coursesInsert = await db.insert(courses).values([
        { title: faker.lorem.words(4), description: faker.lorem.words(30) },
        { title: faker.lorem.words(4), description: faker.lorem.words(30) },
    ]).returning()


    await db.insert(enrollments).values([
        { courseId: coursesInsert[0].id, userId: usersInsert[0].id },
        { courseId: coursesInsert[0].id, userId: usersInsert[1].id },
        { courseId: coursesInsert[1].id, userId: usersInsert[2].id },
    ])

}

seed()