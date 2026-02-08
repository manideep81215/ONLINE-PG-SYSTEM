import axios from "../api/axios";

export const getRoomByStudentId = async (studentId) => {
  try {
    const response = await axios.get(`/students/${studentId}/room`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch room details");
  }
};
