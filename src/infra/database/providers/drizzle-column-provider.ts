import { db } from "../../../main/drizzle";
import type { IColumnDatabseProvider } from "../../contracts/column-database-provider";

export class DrizzleColumnProvider implements IColumnDatabseProvider {
    public async createColumn(column: any): Promise<any> {
        const result = await db.insert(column).values(
            {
                deleted: column.deleted,
            }
        )
        return result;
    }
    public async loadAllColumns(): Promise<any[]> {
        try {
            const result = await db.query.column.findMany()
            return result;
        } catch (error) {
            throw new Error("Could not load all columns", {
                cause: "load-all-columns"
            })
        }
        return []
    }
}