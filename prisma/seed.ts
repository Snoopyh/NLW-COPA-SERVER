import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatarUrl: 'https://github.com/Snoopyh.png',
    }
  })

  const pool  = await prisma.pool.create({
    data : {
      title:'Exemplo',
      code: 'BOL123',
      ownerId: user.id,

      participants:{
        create:{
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data:{
      date: '2022-11-02T12:00:28.280Z',
      firstTeamCountryCode:'DE',
      secondTeamCountryCode:'BR',
    }
  })
  await prisma.game.create({
    data:{
      date: '2022-11-03T12:00:28.280Z',
      firstTeamCountryCode:'AR',
      secondTeamCountryCode:'US',

      guesses: {
        create:{
          firstTeamPoints:3,
          secontTeamPoints:2,

          participant:{
            connect: {
              userId_poolId:{
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}
main()