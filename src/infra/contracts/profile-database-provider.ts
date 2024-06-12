export interface IProfileDatabaseProvider {
    createProfile: (profile: any) => Promise<any>
    loadAllProfiles: () => Promise<any[]>
    deleteProfile: (id: string) => Promise<void>
}