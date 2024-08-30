import { $Enums, Account as account } from '@prisma/client'
export type Role = $Enums.Role
export class Account implements account {
    id: number
    email: string
    password: string
    name: string
    role: $Enums.Role
    bio: string
    avatar: string
    verification_code: string
    is_verified: boolean
    createdAt: Date
    updatedAt: Date
    departmentId: number
}