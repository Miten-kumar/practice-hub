import { User } from "../entity/User"
import {
    countUsers,
    findAllUsers,
    findFirstUser,
    findUserById,
    saveUser,
    searchUsersByTerm,
    seedDefaultUsers,
} from "../repositories/user.repository"

export function getAllUsers() {
    return findAllUsers()
}

export function getDemoUser() {
    return findFirstUser()
}

export function getUserById(id: number) {
    return findUserById(id)
}

export async function searchUsers(rawTerm: unknown) {
    const searchTerm = typeof rawTerm === "string" ? rawTerm.trim().slice(0, 50) : ""

    if (!searchTerm) {
        return {
            searchTerm,
            users: [],
        }
    }

    const users = await searchUsersByTerm(searchTerm)

    return {
        searchTerm,
        users,
    }
}

export async function saveComment(user: User, rawComment: unknown) {
    const bio = typeof rawComment === "string" ? rawComment.trim().slice(0, 300) : ""

    if (!bio) {
        throw new Error("Comment is required.")
    }

    user.bio = bio

    return saveUser(user)
}

export async function seedUsers() {
    const totalUsers = await countUsers()

    if (totalUsers > 0) {
        return
    }

    await seedDefaultUsers()
}
