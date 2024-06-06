export interface ICreateProfileDatabaseProvider {
    createProfile: (profile: any) => Promise<any>
    loadAllProfiles: (profile: any) => Promise<any[]>
}