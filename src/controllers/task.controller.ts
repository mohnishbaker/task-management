import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, priority } = req.body;
  const userId = (req as any).userId;

  const task = await prisma.task.create({
    data: { title, description, dueDate, priority, userId }
  });

  res.json(task);
};

export const getTasks = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const {
      status,
      priority,
      sortBy = 'dueDate',
      order = 'asc',
      page = 1,
      limit = 10
    } = req.query;
  
    const filters: any = { userId };
  
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
  
    const tasks = await prisma.task.findMany({
      where: filters,
      orderBy: { [sortBy as string]: order },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    });
  
    res.json(tasks);
};

export const updateTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = (req as any).userId;
  
      const task = await prisma.task.findUnique({ where: { id: Number(id) } });
      if (!task || task.userId !== userId) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      const updated = await prisma.task.update({
        where: { id: Number(id) },
        data: req.body
      });
  
      return res.json(updated);
    } catch (error) {
      console.error('Error updating task:', error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
  
  
  export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = (req as any).userId;
  
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task || task.userId !== userId) {
      return res.status(404).json({ error: 'Task not found' });
    }
  
    await prisma.task.delete({ where: { id: Number(id) } });
  
    return res.json({ message: 'Task deleted' }); 
  };
  

export const getStats = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
  
    const [total, completed, byPriority, overdue] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, status: 'done' } }),
      prisma.task.groupBy({
        by: ['priority'],
        _count: { priority: true },
        where: { userId }
      }),
      prisma.task.count({
        where: {
          userId,
          status: { not: 'done' },
          dueDate: { lt: new Date() }
        }
      })
    ]);
  
    res.json({
      total,
      completed,
      pending: total - completed,
      byPriority,
      overdue
    });
  };
  
