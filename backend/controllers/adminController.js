import Admin from "../models/Admin.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};
