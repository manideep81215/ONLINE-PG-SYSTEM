// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";

// const StudentsList = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("/students")
//       .then((res) => {
//         setStudents(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading students...</p>;

//   return (
//     <div style={{ padding: "24px" }}>
//       <h2>Students</h2>

//       <table style={{ width: "100%", marginTop: "16px" }}>
//         <thead>
//           <tr>
//             <th align="left">Name</th>
//             <th align="left">Room</th>
//             <th align="left">Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {students.map((student) => (
//             <tr key={student.studentId}>
//               <td>{student.name}</td>
//               <td>{student.roomNumber ?? "—"}</td>
//               <td>
//                 <button
//                   onClick={() =>
//                     navigate(`/warden/students/${student.studentId}`)
//                   }
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentLists;
