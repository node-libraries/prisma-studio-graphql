#!/usr/bin/env node

import { serve } from "@hono/node-server";
import { explorer } from "apollo-explorer/html";
import { generate } from "graphql-auto-query";
import { createYoga } from "graphql-yoga";
import { Hono, Context as HonoContext } from "hono";
import { createBuilder } from "./builder.js";

const builder = createBuilder();

const schema = builder.toSchema({ sortSchema: false });
const yoga = createYoga<HonoContext>({
  graphqlEndpoint: "*",
  schema,
});

const document = generate(schema, 1);

const app = new Hono();
app.get("/", (c) => {
  return c.html(
    explorer({
      initialState: {
        document,
      },
      endpointUrl: "/",
      introspectionInterval: 5000,
    })
  );
});
app.mount("/", yoga);

serve({ fetch: app.fetch, port: 5556 });

console.log("http://localhost:5556/");
