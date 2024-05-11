"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import React from "react";
import CreateButton from "./create-button";
import EventCard from "./event-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Events() {
  const user = useUser();
  const organization = useOrganization();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded)
    orgId = organization.organization?.id ?? user.user?.id;

  const events = useQuery(api.events.getEvents, orgId ? { orgId } : "skip");

  const isLoading = events === undefined;

  return (
    <main className="container mx-auto pt-12">
      {isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24 text-gray-600">
          <Loader2 className="h-32 w-32 animate-spin" />
          <div className="text-xl">Loading your events...</div>
        </div>
      )}

      {!isLoading && events?.length === 0 && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Image
            alt="Image of messages."
            width={300}
            height={300}
            src="/no_events.svg"
          />
          <div className="text-lg">
            You have no active events, go ahead and create an event!
          </div>
          <CreateButton />
        </div>
      )}
      {events && events.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Your Events</h1>
            <CreateButton />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {events?.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
