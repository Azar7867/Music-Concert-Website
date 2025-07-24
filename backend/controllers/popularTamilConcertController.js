// import PopularConcert from "../models/PopularTamilConcert.js";

// export const getPopularTamilConcerts = async (req, res) => {
//   try {
//     const concerts = await PopularConcert.find();
//     res.json(concerts);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch popular Tamil concerts" });
//   }
// };
// export default getPopularTamilConcerts;
import PopularConcert from "../models/PopularTamilConcert.js";

// GET all Popular Tamil Concerts
export const getPopularTamilConcerts = async (req, res) => {
  try {
    const concerts = await PopularConcert.find();
    res.json(concerts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular Tamil concerts" });
  }
};

// GET a single Popular Tamil Concert by ID
export const getPopularTamilConcertById = async (req, res) => {
  try {
    const concert = await PopularConcert.findById(req.params.id);
    if (!concert) return res.status(404).json({ message: 'Concert not found' });
    res.json(concert);
  } catch (error) {
    res.status(500).json({ message: "Error fetching concert" });
  }
};

// CREATE a new Popular Tamil Concert
export const createPopularTamilConcert = async (req, res) => {
  try {
    const concertData = {
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };

    const concert = new PopularConcert(concertData);
    await concert.save();

    res.status(201).json(concert);
  } catch (error) {
    res.status(400).json({ message: "Error creating concert" });
  }
};

// UPDATE a Popular Tamil Concert
export const updatePopularTamilConcert = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.image = `/uploads/${req.file.filename}`;

    const updated = await PopularConcert.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Concert not found' });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating concert" });
  }
};

// DELETE a Popular Tamil Concert
export const deletePopularTamilConcert = async (req, res) => {
  try {
    const deleted = await PopularConcert.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Concert not found' });
    res.json({ message: 'Concert deleted' });
  } catch (error) {
    res.status(500).json({ message: "Error deleting concert" });
  }
};
