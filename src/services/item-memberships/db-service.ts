import { DatabaseTransactionConnection as TrxHandler } from 'slonik';

import { PermissionLevel } from '../../constants';
import { Item } from '../items/interfaces/item';
import { Member } from '../members/interfaces/member';
import { ItemMembership } from './interfaces/item-membership';

export declare class ItemMembershipService {
  private static allColumns;
  /**
   * Get the "best" membership for member w/ `memberId` at `item`.
   * `null` if non-existing.
   * @param memberId Id of member in membership
   * @param item Item whose path is referenced in membership
   * @param transactionHandler Database transaction handler
   */
  getForMemberAtItem(
    memberId: string,
    item: Item,
    transactionHandler: TrxHandler,
  ): Promise<ItemMembership>;
  /**
   * Get the permission level of a membership given the `memberId` and `item`.
   * `null` if non-existing.
   * @param memberId Id of member in membership
   * @param item Item whose path is referenced in membership
   * @param transactionHandler Database transaction handler
   */
  getPermissionLevel(
    memberId: string,
    item: Item,
    transactionHandler: TrxHandler,
  ): Promise<PermissionLevel>;
  /**
   * Get the 'best/nearest' membership to the given `item` for `memberId`.
   * If `includeOwn`, also include membership targeting this `member`+`item`.
   * @param memberId Id of member in membership
   * @param item Item whose path should be considered
   * @param transactionHandler Database transaction handler
   * @param considerLocal Also consider a (possible) membership targeting this `item` for this `member`
   */
  getInherited(
    memberId: string,
    item: Item,
    transactionHandler: TrxHandler,
    considerLocal?: boolean,
  ): Promise<ItemMembership>;
  /**
   * Get all memberships "below" the given `item`'s path, for the member with the given `memberId`, ordered by
   * longest to shortest path - lowest in the (sub)tree to highest in the (sub)tree.
   * @param memberId Id of member in membership
   * @param item Item whose path should be considered
   * @param transactionHandler Database transaction handler
   * @param considerLocal Also consider a (possible) membership targeting this `item` for this `member`
   */
  getAllBelow(
    memberId: string,
    item: Item,
    transactionHandler: TrxHandler,
    considerLocal?: boolean,
  ): Promise<ItemMembership[]>;
  /**
   * Get all memberships on given `item`'s subtree, ordered by
   * longest to shortest path - lowest in the (sub)tree to highest in the (sub)tree.
   * @param item Item whose path should be considered
   * @param transactionHandler Database transaction handler
   */
  getAllInSubtree(
    item: Item,
    transactionHandler: TrxHandler,
  ): Promise<ItemMembership[]>;
  /**
   * Get all the 'best/nearest' memberships for the given `item` for each member
   * with access to it.
   * @param item Item whose path should be considered
   * @param transactionHandler Database transaction handler
   */
  getInheritedForAll(
    item: Item,
    transactionHandler: TrxHandler,
  ): Promise<ItemMembership[]>;
  /**
   * Check if member w/ given `memberId` can `read` given `item`.
   * @param memberId Id of member in membership
   * @param item Item
   * @param transactionHandler Database transaction handler
   */
  canRead(
    memberId: string,
    item: Item,
    transactionHandler: TrxHandler,
  ): Promise<boolean>;
  /**
   * Check if member w/ given `memberId` can `write` given `item`.
   * @param memberId Id of member in membership
   * @param item Item
   * @param transactionHandler Database transaction handler
   */
  canWrite(
    memberId: string,
    item: Item,
    transactionHandler: TrxHandler,
  ): Promise<boolean>;
  /**
   * Check if member w/ given `memberId` can `admin` given `item`.
   * @param memberId Id of member in membership
   * @param item Item
   * @param transactionHandler Database transaction handler
   */
  canAdmin(
    memberId: string,
    item: Item,
    transactionHandler: TrxHandler,
  ): Promise<boolean>;
  /**
   * Get membership by its `id`.
   * @param id Membership unique id
   * @param transactionHandler Database transaction handler
   */
  get(id: string, transactionHandler: TrxHandler): Promise<ItemMembership>;
  /**
   * Create membership.
   * @param membership Partial membership object with `memberId`, `itemPath`, `permission`, `creator`.
   * @param transactionHandler Database transaction handler
   */
  create(
    membership: Partial<ItemMembership>,
    transactionHandler: TrxHandler,
  ): Promise<ItemMembership>;
  /**
   * Create multiple memberships given an array of partial membership objects.
   * @param memberships Array of objects with properties: `memberId`, `itemPath`, `permission`, `creator`
   * @param transactionHandler Database transaction handler
   */
  createMany(
    memberships: Partial<ItemMembership>[],
    transactionHandler: TrxHandler,
  ): Promise<readonly ItemMembership[]>;
  /**
   * Update membership's permission.
   * @param id Membership id
   * @param permission New permission value
   * @param transactionHandler Database transaction handler
   */
  update(
    id: string,
    permission: PermissionLevel,
    transactionHandler: TrxHandler,
  ): Promise<ItemMembership>;
  /**
   * Delete membership.
   * @param id Membership id
   * @param transactionHandler Database transaction handler
   */
  delete(id: string, transactionHandler: TrxHandler): Promise<ItemMembership>;
  /**
   * Delete multiple memberships matching `memberId`+`itemPath`
   * from partial memberships in given array.
   * @param memberships List of objects with: `memberId`, `itemPath`
   * @param transactionHandler Database transaction handler
   */
  deleteManyMatching(
    memberships: Partial<ItemMembership>[],
    transactionHandler: TrxHandler,
  ): Promise<readonly ItemMembership[]>;
  /**
   * Identify any new memberships to be created, and any existing memberships to be
   * removed, after moving the item. These are adjustmnents necessary
   * to keep the constraints in the memberships:
   *
   * * members inherit membership permissions from memberships in items 'above'
   * * memberships 'down the tree' can only improve on the permission level and cannot repeat: read > write > admin
   *
   * ** Needs to run before the actual item move **
   * @param item Item that will be moved
   * @param member Member used as `creator` for any new memberships
   * @param transactionHandler Database transaction handler
   * @param newParentItem Parent item to where `item` will be moved to
   */
  moveHousekeeping(
    item: Item,
    member: Member,
    transactionHandler: TrxHandler,
    newParentItem?: Item,
  ): Promise<{
    inserts: Partial<ItemMembership>[];
    deletes: Partial<ItemMembership>[];
  }>;
}
