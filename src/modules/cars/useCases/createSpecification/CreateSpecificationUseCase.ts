import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface ICreateSpecificationRequest {
  name: string;

  description: string;
}

class CreateSpecificationUseCase {
  // eslint-disable-next-line prettier/prettier

  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: ICreateSpecificationRequest): void {
    const SpecificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (SpecificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationsRepository.create({
      description,

      name,
    });
  }
}

export { CreateSpecificationUseCase };
