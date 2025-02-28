import { Grade } from "../../types/types";

const calculateMedian = (grades: Grade[]): number => {
  if (grades.length === 0) {
    throw new Error('The grades array is empty.');
  }

  // Extract the `points` property from the `value` and sort the array
  const points = grades.map((grade) => grade.value.points).sort((a, b) => a - b);

  const mid = Math.floor(points.length / 2);

  // Calculate the median
  if (points.length % 2 === 0) {
    // If even, average the two middle values
    return (points[mid - 1] + points[mid]) / 2;
  } else {
    // If odd, return the middle value
    return points[mid];
  }
};

export default calculateMedian;