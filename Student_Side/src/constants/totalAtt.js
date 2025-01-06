export default function totalAtt(array) {
    let totalPresent = 0;
    let totalClasses = 0;
    array.forEach((element) => {
        totalPresent += element.totalPresent;
        totalClasses += element.totalClasses;
    });
    const att = Math.round((totalPresent / totalClasses) * 100);
    return { attendance: att };
}
