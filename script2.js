
let CurrentId = 1;
async function showPrewiousStudent() {
    if (CurrentId <= 1) {
        throw new Error('Start of List');
    }
    CurrentId -= 1;
    const auth = btoa('admin:12345');
    try {
        fetch(`http://127.0.0.1:8000/main/student/${CurrentId}`, { headers: { Authorization: `Basic ${auth}` } })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Помилка мережі');
                }
                return response.json();
            })
            .then((data) => {
                document.getElementById('user-name').innerText = `${data.id} ${data.name} ${data.surname}`;
            });
    } catch (error) {
        CurrentId += 1;
        throw new Error('Some error');
    }
}
async function showNextStudent() {
    CurrentId += 1;
    const auth = btoa('admin:12345');
    try {
        fetch(`http://127.0.0.1:8000/main/student/${CurrentId}`, { headers: { Authorization: `Basic ${auth}` } })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Елемент не найдено');
                    } else {
                        throw new Error('Помилка мережі');
                    }
                }
                return response.json();
            })
            .then((data) => {
                document.getElementById('user-name').innerText = `${data.id} ${data.name} ${data.surname}`;
            });
    } catch (error) {
        CurrentId -= 1;
        throw new Error('Some error');
    }
}

async function ShowSubjects() {
    const auth = btoa('admin:12345');
    try {
        const response = await fetch('http://127.0.0.1:8000/main/lesson', { headers: { Authorization: `Basic ${auth}` } });
        if (!response.ok) {
            throw new Error(`Помилка: ${response.status}`);
        }

        const data = await response.json();
        const subjectsContainer = document.getElementById('subjects');
        subjectsContainer.innerHTML = '';

        data.forEach((subject) => {
            const p = document.createElement('p');
            p.innerText = `${subject.name} — term: ${subject.term}`;
            subjectsContainer.appendChild(p);
        });
    } catch (error) {
        throw new Error('Download error');
    }
}

async function ShowTeacher(id) {
    const auth = btoa('admin:12345');
    try {
        fetch(`http://127.0.0.1:8000/main/teacher/${id}`, { headers: { Authorization: `Basic ${auth}` } })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Помилка мережі');
                }
                return response.json();
            })
            .then((data) => {
                document.getElementById('teacher').innerText = ` ${data.first_name} ${data.last_name} ${data.phone}`;
            });
    } catch (error) {
        throw new Error('Some Error');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Слухач для кнопки "Назад"
    const prevBtn = document.getElementById('prev-student-btn');
    if (prevBtn) prevBtn.addEventListener('click', showPrewiousStudent);

    // Слухач для кнопки "Вперед"
    const nextBtn = document.getElementById('next-student-btn');
    if (nextBtn) nextBtn.addEventListener('click', showNextStudent);

    // Слухач для завантаження предметів
    const loadSubjectsBtn = document.getElementById('load-subjects-btn');
    if (loadSubjectsBtn) loadSubjectsBtn.addEventListener('click', ShowSubjects);

    // Приклад для вчителя (якщо є кнопка або поле введення ID)
    const loadTeacherBtn = document.getElementById('load-teacher-btn');
    if (loadTeacherBtn) {
        loadTeacherBtn.addEventListener('click', () => {
            // Тут можна брати ID з якогось input поля
            ShowTeacher(1);
        });
    }
});
