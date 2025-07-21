import ConcertDetails from "../models/ConcertDetails.js";

export const getConcertDetails = async (req, res) => {
  try {
    const details = await ConcertDetails.find();
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch concert details" });
  }
};
