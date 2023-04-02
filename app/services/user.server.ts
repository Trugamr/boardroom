import { Prisma } from '@prisma/client'
import { SteamStrategyVerifyParams } from 'remix-auth-steam'
import { prisma } from './prisma.server'

export async function verifySteamUser(profile: SteamStrategyVerifyParams) {
  const id = profile.steamID
  const data: Prisma.UserCreateInput = {
    id,
    nickname: profile.nickname,
    avatar: {
      connectOrCreate: {
        where: { id },
        create: {
          small: profile.avatar.small,
          medium: profile.avatar.medium,
          large: profile.avatar.large,
        },
      },
    },
  }
  const user = await prisma.user.upsert({
    where: { id },
    create: data,
    update: data,
  })
  return { userId: user.id }
}

export function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id }, include: { avatar: true } })
}
