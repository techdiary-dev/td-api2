import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';

import { Session } from './session.type';
import { store, index } from 'quick-crud';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AUTH_DOMAIN, JWTPayload } from './session.type';
import { Types } from 'mongoose';
import { PaginationInput, ResourceList } from 'src/shared/types';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session)
    private readonly model: ReturnModelType<typeof Session>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Get session for any role
   * @param sub Subscriber _id
   * @param domain Subscriber domain
   */
  async findOrCreateSession(
    sub: Types.ObjectId,
    domain: AUTH_DOMAIN,
  ): Promise<DocumentType<Session>> {
    const session = await this.model.findOne({ sub, domain });

    if (!session) {
      const newSession = await this.createSession(sub, domain);
      return newSession;
    }
    return session;
  }

  /**
   * Get session for any role
   * @param sub Subscriber _id
   * @param domain Subscriber domain
   */
  async getSession(
    sub: Types.ObjectId,
    domain: AUTH_DOMAIN,
  ): Promise<DocumentType<Session>> {
    const session = await this.model.findOne({ sub, domain });
    return session;
  }

  /**
   * Create a new session
   * @param sub Subscriber _id
   * @param domain Subscriber domain
   */
  async createSession(
    sub: Types.ObjectId,
    domain: AUTH_DOMAIN,
  ): Promise<DocumentType<Session>> {
    const token = await this.generateToken(sub, domain);
    const session = await store({
      model: this.model,
      data: { sub, domain, token },
    });
    return session;
  }

  /**
   * Generate token for a sub
   * @param sub Subscriber _id
   * @param domain Subscriber domain
   */
  generateToken(sub: Types.ObjectId, domain: AUTH_DOMAIN): Promise<string> {
    const payload: JWTPayload = {
      iss: this.config.get('APP_NAME'),
      sub,
      domain,
    };

    return this.jwtService.signAsync(payload);
  }

  /**
   * Delete session of a subscriber
   * @param sub Subscriber _id
   * @param domain Subscriber domain
   */
  async deleteSession(
    sub: Types.ObjectId,
    domain: AUTH_DOMAIN,
  ): Promise<boolean> {
    const deleted = await this.model.findOneAndDelete({ sub, domain });
    if (!deleted) throw new NotFoundException('Invalid or deleted session');
    return true;
  }

  /**
   * Get All Session By Admin
   * @param PaginationInput pagination
   */
  async getAllSession(
    sub: Types.ObjectId,
    pagination: PaginationInput,
  ): Promise<ResourceList<Session>> {
    return await index({
      model: this.model,
      where: { sub: { $ne: sub } },
      paginationOptions: pagination,
    });
  }
}
