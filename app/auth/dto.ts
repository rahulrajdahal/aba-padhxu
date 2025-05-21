import 'server-only';

import { UserRoles } from "@prisma/client";
import { getUser } from './dal';



export const getUserRole = async () => {
    const user = await getUser()

    if (!user) {
        throw new Error("User not found")
    }

    return user.role
}

export const getUserId = async () => {
    const user = await getUser()

    if (!user) {
        throw new Error("User not found")
    }

    return user.id
}


export const canUseDashboard = async () => {

    const userRole = await getUserRole()

    if (userRole === UserRoles.SELLER) {
        return true
    }

    return false

}
