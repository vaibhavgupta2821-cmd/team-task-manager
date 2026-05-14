const prisma = require("../prisma/prismaClient");

async function createTask(req, res) {
  try {
    const { title, description } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(),
        status: "TODO",
      },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const getTasks = async (req, res) => {
  try {
    const tasks =
      await prisma.task.findMany();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const task =
      await prisma.task.update({
        where: {
          id: req.params.id,
        },
        data: {
          status,
        },
      });

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (
  req,
  res
) => {
  try {
    await prisma.task.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};