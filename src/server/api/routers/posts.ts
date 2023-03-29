import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return posts;
  }),

  makePost: publicProcedure
    .input(
      z.object({
        postBody: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(input, "from backend");
      return await ctx.prisma.post.create({
        data: {
          content: input.postBody,
        },
      });
    }),
});
