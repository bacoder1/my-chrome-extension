import { Grade } from "../../types/types";

export function getSubjectAverage(subject: Grade[], target = "student") {
	const calcGradesList: number[] = [];
	const calcOutOfList: number[] = [];

	subject.forEach((grade) => {
		const targetGrade = (grade as Record<string, any>)[target];

		if (!targetGrade || targetGrade.disabled || !targetGrade.points) return;

		if (grade.coefficient === 0) return;

		if (targetGrade.points > 20 || grade.coefficient < 1) {
			const gradeOn20 = (targetGrade.points / grade.outOf.points) * 20;

			calcGradesList.push(gradeOn20 * grade.coefficient);
			calcOutOfList.push(20 * grade.coefficient);
		} else {
			calcGradesList.push(targetGrade.points * grade.coefficient);
			calcOutOfList.push(grade.outOf.points * grade.coefficient);
		}
	});

	if (calcGradesList.length === 0) return 0;

	const calcGradesAvg = calcGradesList.reduce((acc, grade) => acc + grade, 0);

	const calcOutOfAvg = calcOutOfList.reduce((acc, outOf) => acc + outOf, 0);

	return (calcGradesAvg / calcOutOfAvg) * 20;
}
