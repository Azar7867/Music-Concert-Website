import PopularConcert from "../models/PopularTamilConcert.js";

export const getPopularTamilConcerts = async (req, res) => {
  try {
    const concerts = await PopularConcert.find();
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular Tamil concerts" });
  }
};
export default getPopularTamilConcerts;