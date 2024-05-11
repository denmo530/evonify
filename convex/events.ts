import { QueryCtx, MutationCtx } from "./_generated/server.d";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./users";

async function hasAccessToOrg(
  ctx: QueryCtx | MutationCtx,
  tokenIdentifier: string,
  orgId: string
) {
  const user = await getUser(ctx, tokenIdentifier);

  const hasAccess =
    user.orgIds.includes(orgId) || user.tokenIdentifier.includes(orgId);

  return hasAccess;
}

export const createEvent = mutation({
  args: {
    name: v.string(),
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity)
      throw new ConvexError("You must be logged in to create an event.");

    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess)
      throw new ConvexError("you do not have access to this organization");

    await ctx.db.insert("events", {
      name: args.name,
      orgId: args.orgId,
    });
  },
});

export const getEvents = query({
  args: {
    orgId: v.string(),
  },
  async handler(ctx, args) {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return [];

    // ? May want to let everyone get events? maybe remove later
    const hasAccess = await hasAccessToOrg(
      ctx,
      identity.tokenIdentifier,
      args.orgId
    );

    if (!hasAccess) return [];

    let events = await ctx.db
      .query("events")
      .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
      .collect();

    return events;
  },
});
