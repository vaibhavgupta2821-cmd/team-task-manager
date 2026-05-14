const prisma = require("../prisma/prismaClient");

const getDashboard = async (req, res) => {
  try {
    const totalTasks = await prisma.task.count();

    const completedTasks =
      await prisma.task.count({
        where: {
          status: "DONE",
        },
      });

    const pendingTasks =
      await prisma.task.count({
        where: {
          status: "TODO",
        },
      });

    const overdueTasks =
      await prisma.task.count({
        where: {
          dueDate: {
            lt: new Date(),
          },
          status: {
            not: "DONE",
          },
        },
      });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
}; 