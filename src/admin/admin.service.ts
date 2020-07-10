import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { store, show } from 'quick-crud';
import { Admin } from './admin.type';
import { CreateAdminInput, UpdateAdminInput } from './admin.input';
import { Types } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private readonly model: ReturnModelType<typeof Admin>,
  ) {}

  /**
   * Create an admin
   * @param data CreateAdminDTO
   */
  async create(data: CreateAdminInput): Promise<DocumentType<Admin>> {
    return store({ model: this.model, data });
  }

  /**
   * Get an admin via _id
   * @param _id admin doc objectId
   */
  async getById(_id: string): Promise<Admin> {
    return show({ model: this.model, where: { _id } });
  }

  /**
   * Get a admin by username
   * @param username admin username
   */
  async getByUsername(username: string): Promise<Admin> {
    return show({ model: this.model, where: { username } });
  }

  /**
   * Get and admin by email address
   * @param email admin email address
   */

  async getByEmail(email: string): Promise<Admin> {
    return show({ model: this.model, where: { email } });
  }

  /**
   * Get an admin by identifier
   * @param identifier email address or username
   */
  async getByIdentifier(identifier: string): Promise<DocumentType<Admin>> {
    const admin = await this.model.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    return admin;
  }

  async update(
    _id: Types.ObjectId,
    data: UpdateAdminInput,
  ): Promise<DocumentType<Admin>> {
    return this.model.findOneAndUpdate({ _id }, { ...data }, { new: true });
  }

  /**
   * Get admin count
   * @return number
   */
  async count(): Promise<any> {
    return this.model.countDocuments({});
  }
}
