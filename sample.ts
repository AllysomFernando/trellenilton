// src/domain/features/create-user.ts

type Input = {
  name: string,
  age: number
}
type Output = {
  success: boolean
}
type CreateUser = (input: Input) => Promise<Output>
type SetupCreateUserProps = {
  sum: Sum
}
type Setup = (props: SetupCreateUserProps) => CreateUser

// export function setupCreateUser(): CreateUser {
//   return async (input) => {
//     return ""
//   }
// }

// export const setupCreateUser: Setup = () => {
//   return async function nome() => {
//     return ""
//   }
// }

export const setupCreateUser: Setup = () => async () => {
  return {
    success: true
  }
}

// src/domain/contracts/contract-name.ts

export type Sum = (a: number, b: number) => number