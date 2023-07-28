const { Favorite } = require("../DB_connection");

const postFav = async (req, res) => {
  try {
    const { id, name, origin, status, image, species, gender } = req.body;

    if (!id || !name || !origin || !status || !image || !species || !gender)
      return res.status(401).send("Faltan datos");

    await Favorite.findOrCreate({
      where: {
        id,
        name,
        origin,
        status,
        image,
        species,
        gender,
      },
    });

    const allfav = await Favorite.findAll();

    return res.status(200).json(allfav);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postFav;
