import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';

export type AppRouter = typeof appRouter;

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

const cookies: string[] = [];

const appRouter = router({
  // GET http://localhost:2022/getCookie
  getCookie: publicProcedure.query(() => cookies),

  // POST http://localhost:2022/setCookie "🍪"
  setCookie: publicProcedure.input(z.string()).mutation(({ input }) => {
    cookies.push(input);
    return cookies;
  }),
});

createHTTPServer({
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(2022);
