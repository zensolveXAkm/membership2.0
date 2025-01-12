import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { saveAs } from "file-saver";

function MembershipListPage() {
  const [memberships, setMemberships] = useState([]);
  const [filteredMemberships, setFilteredMemberships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [utrMember, setUtrMember] = useState(null);
  const [utrInput, setUtrInput] = useState("");

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "memberships"));
        const membersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMemberships(membersList);
        setFilteredMemberships(membersList);
      } catch (error) {
        console.error("Error fetching memberships: ", error);
      }
    };

    fetchMemberships();
  }, []);

  // Search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const lowerCaseQuery = e.target.value.toLowerCase();
    const filtered = memberships.filter(
      (member) =>
        member.id.toLowerCase().includes(lowerCaseQuery) ||
        member.name.toLowerCase().includes(lowerCaseQuery) ||
        member.phone.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMemberships(filtered);
  };

  // Handle UTR Input submission
  const handleUtrSubmit = async () => {
    if (!utrMember || !utrInput) return;
    try {
      const memberDoc = doc(db, "memberships", utrMember.id);
      await updateDoc(memberDoc, { utrNumber: utrInput });
      setMemberships((prev) =>
        prev.map((member) =>
          member.id === utrMember.id ? { ...member, utrNumber: utrInput } : member
        )
      );
      setFilteredMemberships((prev) =>
        prev.map((member) =>
          member.id === utrMember.id ? { ...member, utrNumber: utrInput } : member
        )
      );
      setUtrMember(null);
      setUtrInput("");
      alert("UTR Number added successfully!");
    } catch (error) {
      console.error("Error updating UTR number: ", error);
    }
  };

  // Handle Approve Membership
  const handleApprove = async (memberId) => {
    try {
      const memberDoc = doc(db, "memberships", memberId);
      await updateDoc(memberDoc, { paymentStatus: "Approved" });
      setMemberships((prev) =>
        prev.map((member) =>
          member.id === memberId ? { ...member, paymentStatus: "Approved" } : member
        )
      );
      setFilteredMemberships((prev) =>
        prev.map((member) =>
          member.id === memberId ? { ...member, paymentStatus: "Approved" } : member
        )
      );
      alert("Membership approved!");
    } catch (error) {
      console.error("Error approving membership: ", error);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvData = [
      [
        "Member ID",
        "Name",
        "Email",
        "Phone",
        "State",
        "District",
        "Father's Name",
        "Payment Status",
        "UTR Number",
      ],
      ...memberships.map((member) => [
        member.id,
        member.name,
        member.email,
        member.phone,
        member.state,
        member.district,
        member.fathersName,
        member.paymentStatus || "Pending",
        member.utrNumber || "Not Provided",
      ]),
    ];
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "memberships.csv");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Memberships List</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Member ID, Name, or Phone"
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {/* Export to CSV Button */}
      <button
        onClick={exportToCSV}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Export to CSV
      </button>

      {/* UTR Input Modal */}
      {utrMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add UTR Number</h2>
            <input
              type="text"
              placeholder="Enter UTR Number"
              value={utrInput}
              onChange={(e) => setUtrInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setUtrMember(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUtrSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b text-left">Member ID</th>
              <th className="px-4 py-2 border-b text-left">Name</th>
              <th className="px-4 py-2 border-b text-left">Email</th>
              <th className="px-4 py-2 border-b text-left">Phone</th>
              <th className="px-4 py-2 border-b text-left">State</th>
              <th className="px-4 py-2 border-b text-left">District</th>
              <th className="px-4 py-2 border-b text-left">Father's Name</th>
              <th className="px-4 py-2 border-b text-left">Payment Status</th>
              <th className="px-4 py-2 border-b text-left">UTR Number</th>
              <th className="px-4 py-2 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMemberships.length === 0 ? (
              <tr>
                <td colSpan="10" className="px-4 py-2 text-center text-gray-500">
                  No memberships found.
                </td>
              </tr>
            ) : (
              filteredMemberships.map((membership) => (
                <tr key={membership.id}>
                  <td className="px-4 py-2 border-b">{membership.id}</td>
                  <td className="px-4 py-2 border-b">{membership.name}</td>
                  <td className="px-4 py-2 border-b">
                    <a href={`mailto:${membership.email}`} className="text-blue-600 underline">
                      {membership.email}
                    </a>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <a href={`tel:${membership.phone}`} className="text-blue-600 underline">
                      {membership.phone}
                    </a>
                  </td>
                  <td className="px-4 py-2 border-b">{membership.state}</td>
                  <td className="px-4 py-2 border-b">{membership.district}</td>
                  <td className="px-4 py-2 border-b">{membership.fathersName}</td>
                  <td className="px-4 py-2 border-b">
                    {membership.paymentStatus || "Pending"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {membership.utrNumber || (
                      <button
                        onClick={() => setUtrMember(membership)}
                        className="text-blue-600 underline"
                      >
                        Add UTR
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {membership.paymentStatus === "Approved" ? (
                      "Approved"
                    ) : membership.utrNumber ? (
                      <button
                        onClick={() => handleApprove(membership.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                    ) : (
                      "Add UTR First"
                    )}
                  </td>
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
