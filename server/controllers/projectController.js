const prisma = require("../prismaClient");

const createProject = async (
  req,
  res
) => {
  try {
    const { title, description } =
      req.body;

    const project =
      await prisma.project.create({
        data: {
          title,
          description,
        },
      });

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProjects = async (
  req,
  res
) => {
  try {
    const projects =
      await prisma.project.findMany();

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
};