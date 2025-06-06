import React from "react";

const buyedProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99.99",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$199.99",
    image: "https://via.placeholder.com/150",
  },
];

const cartProducts = [
  {
    id: 1,
    name: "Bluetooth Speaker",
    price: "$49.99",
    image: "https://via.placeholder.com/150",
  },
];

const ProductCard = ({ product }) => (
  <div className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-cover rounded-lg mb-2"
    />
    <h3 className="text-lg font-semibold">{product.name}</h3>
    <p className="text-gray-500">{product.price}</p>
  </div>
);

const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 text-sm">
      {/* Main Profile Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Profile Info */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 space-y-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1999/1999625.png"
              alt="User"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">John Doe</h2>
              <p className="text-gray-500">#ERD246534</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">About</h3>
            <p className="text-gray-600">📞 0300 2476683</p>
            <p className="text-gray-600">📧 johndoe@example.com</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
            <p className="text-gray-600">🏠 KDA TP-2 Mehmoodabad</p>
            <p className="text-gray-600">🏙️ Karachi, PK</p>
            <p className="text-gray-600">📮 75600</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Employee details</h3>
            <p className="text-gray-600">🎂 Sep 26, 1988</p>
            <p className="text-gray-600">🆔 GER10654</p>
            <p className="text-gray-600">💼 Project Manager</p>
            <p className="text-gray-600">📅 Jan 05, 2023</p>
          </div>
        </div>

        {/* Right Detailed Info */}
        <div className="md:col-span-2 space-y-10">
          {/* Job Info */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Job Information</h3>
              <button className="text-red-500 font-medium text-sm hover:underline">
                + Add Info
              </button>
            </div>
            <table className="w-full text-left text-gray-700 text-sm border-t border-gray-200">
              <thead>
                <tr className="border-b font-semibold">
                  <th>Department</th>
                  <th>Division</th>
                  <th>Manager</th>
                  <th>Hire Date</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td>Creative Associate</td>
                  <td>Project Management</td>
                  <td>Alex Foster</td>
                  <td>May 13, 2024</td>
                  <td>Metro DC</td>
                </tr>
                <tr className="border-b">
                  <td>Marketing Team</td>
                  <td>Leadership</td>
                  <td>Jack Danniel</td>
                  <td>Sep 05, 2024</td>
                  <td>Bergen, NJ</td>
                </tr>
                <tr className="border-b">
                  <td>Team Lead</td>
                  <td>Creator</td>
                  <td>Alina Skazka</td>
                  <td>Jun 08, 2023</td>
                  <td>Miami, FL</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Activity & Compensation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Activity */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Activity</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/12.jpg"
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">
                    <strong>John Miller</strong> last login on Jul 13, 2024 – 05:36 PM
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/14.jpg"
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-700">
                    <strong>Merva Sahin</strong> created on Sep 08, 2024 – 03:12 PM
                  </span>
                </li>
              </ul>
            </div>

            {/* Compensation */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Compensation</h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>862.00 USD/month</strong>
                  <p className="text-xs text-gray-500">Effective date: May 10, 2015</p>
                </li>
                <li>
                  <strong>1560.00 USD/quarter</strong>
                  <p className="text-xs text-gray-500">Effective date: Jun 08, 2022</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
