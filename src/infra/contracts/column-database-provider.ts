export interface IColumnDatabseProvider{
    createColumn: (column: any) => Promise<any>;
}