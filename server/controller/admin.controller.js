export const registerAdmin = async (req, res) => {
  const { name, email, password, address, phone, avatar, role, adminSecret } = req.body;
  console.log(name, email, password, address, phone, avatar, role, adminSecret);

};
