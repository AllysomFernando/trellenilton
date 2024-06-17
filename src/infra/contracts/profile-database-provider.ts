export interface IProfileDatabaseProvider {
    createProfile: (name: string, deleted: boolean, funcao: string) => Promise<any>
    loadAllProfiles: () => Promise<any[]>
    deleteProfile: (id: string) => Promise<any>
    renameProfile: (profile: any, id: string) => Promise<any>
}