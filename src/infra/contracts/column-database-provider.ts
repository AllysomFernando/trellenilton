export interface IColumnDatabseProvider {
    createColumn: (deleted: boolean) => Promise<any>;
    loadAllColumns: () => Promise<any[]>;
}