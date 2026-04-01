import { ILike } from "typeorm"
import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

const userRepository = AppDataSource.getRepository(User)

export function findAllUsers() {
    return userRepository.find({
        order: { id: "ASC" },
    })
}

export function findFirstUser() {
    return userRepository.find({
        order: { id: "ASC" },
        take: 1,
    })
        .then((users) => users[0] ?? null)
}

export function findUserById(id: number) {
    return userRepository.findOneBy({ id })
}

export function searchUsersByTerm(term: string) {
    return userRepository.find({
        where: [
            { firstName: ILike(`%${term}%`) },
            { lastName: ILike(`%${term}%`) },
            { email: ILike(`%${term}%`) },
        ],
        order: { id: "ASC" },
        take: 10,
    })
}

export function saveUser(user: User) {
    return userRepository.save(user)
}

export function countUsers() {
    return userRepository.count()
}

export function seedDefaultUsers() {
    return userRepository.save([
        {
            firstName: "Timber",
            lastName: "Saw",
            email: "timber@example.com",
            age: 25,
            bio: "I like woodworking and secure apps.",
        },
        {
            firstName: "Ada",
            lastName: "Stone",
            email: "ada@example.com",
            age: 31,
            bio: "Full-stack engineer and careful code reviewer.",
        },
    ])
}
