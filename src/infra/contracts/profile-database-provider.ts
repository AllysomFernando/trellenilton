export interface IProfileDatabaseProvider {
    createProfile: (profile: any) => Promise<any>
    loadAllProfiles: () => Promise<any[]>
    deleteProfile: (id: string) => Promise<any>
    renameProfile: (profile: any, id: string) => Promise<void>
}