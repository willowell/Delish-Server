
import { createLocalServer } from './server'

async function main (): Promise<void> {
  const server = createLocalServer()

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  server.listen().then(({ url }) => {
    console.log(`🥓 Let's get cooking! 🥞 I'm listening at ${url}`)
  })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
