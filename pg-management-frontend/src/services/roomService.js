export const getRoomByStudentId = async (studentId) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/students/${studentId}/room`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch room details");
  }

  return response.json();
};
