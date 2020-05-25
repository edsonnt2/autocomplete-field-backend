import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../database/entities/User';
import Category from '../database/entities/Category';

interface IRequest extends Request {
  body: {
    name: string;
    categories: string[];
  };
}

interface DataCategory {
  category?: {
    id?: number;
    name?: string;
  };
}

export default class UserControllers {
  public async create(req: IRequest, res: Response): Promise<Response> {
    const userRepository = getRepository(User);
    const categoryRepository = getRepository(Category);

    const { name, categories } = req.body;

    const findCategories = await categoryRepository.find();

    const insertCategory: DataCategory[] = [];

    categories.forEach(getCategory => {
      const findCategory = findCategories.find(cat => cat.name === getCategory);
      if (findCategory)
        insertCategory.push({
          category: { id: findCategory.id, name: findCategory.name },
        });
      else insertCategory.push({ category: { name: getCategory } });
    });

    const user = userRepository.create({
      name,
      user_category: [...insertCategory],
    });

    await userRepository.save(user);
    return res.json(user);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.find();

    return res.json(user);
  }
}
