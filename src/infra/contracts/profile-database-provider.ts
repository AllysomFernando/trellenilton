export interface ICreateProfileDatabaseProvider {
    createProfile: (profile: any) => Promise<any>
    loadAllProfiles: () => Promise<any[]>
}