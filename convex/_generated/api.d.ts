/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.11.3.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as clerk from "../clerk.js";
import type * as emails_EventCreatedEmail from "../emails/EventCreatedEmail.js";
import type * as emails_emails from "../emails/emails.js";
import type * as eventSubscribers from "../eventSubscribers.js";
import type * as events from "../events.js";
import type * as helpers from "../helpers.js";
import type * as http from "../http.js";
import type * as notifications from "../notifications.js";
import type * as socials_facebook from "../socials/facebook.js";
import type * as subscribers from "../subscribers.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  clerk: typeof clerk;
  "emails/EventCreatedEmail": typeof emails_EventCreatedEmail;
  "emails/emails": typeof emails_emails;
  eventSubscribers: typeof eventSubscribers;
  events: typeof events;
  helpers: typeof helpers;
  http: typeof http;
  notifications: typeof notifications;
  "socials/facebook": typeof socials_facebook;
  subscribers: typeof subscribers;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
