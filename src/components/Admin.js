import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function MembershipListPage() {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "memberships"));
        const membersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMemberships(membersList);
      } catch (error) {
        console.error("Error fetching memberships: ", error);
      }
    };

    fetchMemberships();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Memberships List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Phone</th>
              <th className="px-4 py-2 border-b text-left">State</th>
              <th className="px-4 py-2 border-b text-left">District</th>
              <th className="px-4 py-2 border-b text-left">Father's Name</th>
            </tr>
          </thead>
          <tbody>
            {memberships.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No memberships found.
                </td>
              </tr>
            ) : (
              memberships.map((membership) => (
                <tr key={membership.id}>
                  <td className="px-4 py-2 border-b">{membership.name}</td>
                  <td className="px-4 py-2 border-b">{membership.email}</td>
                  <td className="px-4 py-2 border-b">{membership.phone}</td>
                  <td className="px-4 py-2 border-b">{membership.state}</td>
                  <td className="px-4 py-2 border-b">{membership.district}</td>
                  <td className="px-4 py-2 border-b">{membership.fathersName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MembershipListPage;
