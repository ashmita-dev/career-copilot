const roleModel = require("../models/roleModel");

const getRoles = async (req, res) => {
  try {
    const roles = await roleModel.getAllRoles();

    res.status(200).json(roles);
  } catch (error) {
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
};

module.exports = {
  getRoles,
};