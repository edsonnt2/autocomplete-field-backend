import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Category from '../database/entities/Category';

export default class CategoryControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();

    return res.json(categories);
  }
}
