export function makeCourse() {
    return {
        id: 'course-1',
        title: 'Curso de Testes',
        description: 'Aprenda a testar seu código',
        duration: 3600,
        teacher: {
            id: 'teacher-1',
            name: 'Professor Teste',
        },
    };
}