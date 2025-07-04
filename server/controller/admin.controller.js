export const registerAdmin = async (req, res) => {
  const { name, email, password, address, phone, avatar, adminSecret } = req.body;
  console.log(name, email, password, address, phone, avatar, adminSecret);
};
