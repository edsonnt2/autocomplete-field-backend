import { getRepository, Like } from 'typeorm';
import { Request, Response } from 'express';
import Category from '../database/entities/Category';

export default class CategoryControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const { search } = req.query;
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find({
      where: {
        name: Like(`%${search}%`),
      },
      take: 20,
    });

    return res.json(categories);
  }
}
