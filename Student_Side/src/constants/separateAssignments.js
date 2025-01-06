export function separateAssignment(array) {
    let assignments = [];
    let subjects = [];
    array.forEach((element) => {
        if (!subjects.includes(element.subject.name)) {
            subjects.push(element.subject.name);
            assignments.push({
                subject: element.subject.name,
                teacher: element.teacher.name,
                assignment: [element.description],
            });
        } else {
            assignments.forEach((ele, id) => {
                if (ele.subject == element.subject.name) {
                    assignments[id].assignment = [
                        ...assignments[id].assignment,
                        element.description,
                    ];
                }
            });
        }
    });
    return assignments;
}
