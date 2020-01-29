import { Model } from 'objection';

class BaseModel extends Model {
  createdAt: string;
  updatedAt: string;

  static get modelPaths(): string[] {
    return [__dirname];
  }

  $beforeInsert(): void {
    const now = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export default BaseModel;
