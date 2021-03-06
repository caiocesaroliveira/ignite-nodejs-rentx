import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICreateCategoryRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: ICreateCategoryRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    await this.categoriesRepository.create({
      description,

      name,
    });
  }
}

export { CreateCategoryUseCase };
