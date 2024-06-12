export interface ICreateProfileDatabaseProvider {
    createProfile: (profile: any) => Promise<any>
    loadAllProfiles: () => Promise<any[]>
    deleteProfile: (profile: any, id: string) => Promise<any>
}