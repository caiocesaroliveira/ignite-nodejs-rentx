import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICreateCategoryRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }

  execute({ name, description }: ICreateCategoryRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

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
