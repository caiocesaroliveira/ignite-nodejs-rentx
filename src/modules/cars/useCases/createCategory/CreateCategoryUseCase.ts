import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICreateCategoryRequest {
  name: string;

  description: string;
}

class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier

  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, description }: ICreateCategoryRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesRepository.create({
      description,

      name,
    });
  }
}

export { CreateCategoryUseCase };
