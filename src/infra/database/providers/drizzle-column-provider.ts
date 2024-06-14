import { db } from "../../../main/drizzle";
import type { IColumnDatabseProvider } from "../../contracts/column-database-provider";
import { card } from "../models";

export class DrizzleColumnProvider implements IColumnDatabseProvider {
    public async createColumn(column: any): Promise<any> {
        const result = await db.insert(column).values(
            {
                deleted: column.deleted,
            }
        )
        return result;
    }
}