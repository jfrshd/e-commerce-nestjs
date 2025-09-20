import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtIncludeDeletedGuard extends AuthGuard('jwt-include-deleted') {}
