export interface IProfileDatabaseProvider {
    createProfile: (profile: any) => Promise<any>
    loadAllProfiles: () => Promise<any[]>
    deleteProfile: (profile: any, id: string) => Promise<any>
}