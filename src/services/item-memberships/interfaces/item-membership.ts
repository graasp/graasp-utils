import { PermissionLevel } from '../../../constants';

export interface ItemMembership {
  id: string;
  memberId: string;
  itemPath: string;
  permission: PermissionLevel;
  creator: string;
  createdAt: string;
  updatedAt: string;
}
