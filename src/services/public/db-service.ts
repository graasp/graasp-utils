import { DatabaseTransactionHandler } from '../database';
import { Item } from '../items';

export declare class PublicItemService {
  /**
   * Check if item has public tag.
   * @param item Item
   * @param transactionHandler Database transaction handler
   */
  isPublic(
    item: Item,
    transactionHandler: DatabaseTransactionHandler,
  ): Promise<boolean>;
}
