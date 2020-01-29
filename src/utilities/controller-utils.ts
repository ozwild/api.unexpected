import { NotFoundException } from '@nestjs/common';

export async function findOrThrow<I, T>(id: I, fn: (id: I) => Promise<T>): Promise<T> {
  const result = await fn(id);

  if (!result) {
    throw new NotFoundException(`No item found with id ${id}`);
  }

  return result;
}
