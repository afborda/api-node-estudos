import { faker } from "@faker-js/faker";
import { db } from "../../database/client.ts";
import { courses } from "../../database/schema.ts";

export async function makeCourse(titleId?: string) {
    const result = await db.insert(courses).values({
        title: titleId ?? faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
    }).returning({ id: courses.id, title: courses.title, description: courses.description });

    return result[0];
}