import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { linguagensRouter } from "./routers/linguagens";
import { usuarioRouter } from "./routers/usuario";
import { perguntasRouter } from "./routers/perguntas"; // ← Só uma importação!

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  usuario: usuarioRouter,
  linguagens: linguagensRouter,
  perguntas: perguntasRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);