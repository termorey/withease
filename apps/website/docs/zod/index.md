<script setup>
import pkg from '../../../../packages/zod/package.json';

const maxSize = pkg['size-limit'].at(0).limit;
</script>

# @withease/zod

Extremely small adapter (less than **{{maxSize}}** controlled by CI) for Zod package support, initially created for [_Contracts_](/protocols/contract) that allows you to introduce data validation on edges of the application.

## Installation

First, you need to install package:

::: code-group

```sh [pnpm]
pnpm install @withease/zod
```

```sh [yarn]
yarn add @withease/zod
```

```sh [npm]
npm install @withease/zod
```

:::

## Version compatibility

Best way of usage - use supported zod version. zod@4 is preferred, but we understand the need to maintain a transitional versions help you with migrations.

## Before zod@3.25.0

You can use adapter from [Farfetched](https://ff.effector/)

```ts
import { z } from "zod";
import { zodContract } from '@farfetched/zod';
```

## With zod@^3.25.0

You still can use latest versions of zod@3 for migrations we support it.

```ts
import { z } from "zod/v3";
import { zodContract } from '@withease/zod';
```

## Usage as a _Contract_

`@withease/zod` is an adapter based on `@withease/contract` (used only [_Contract_ protocol](/protocol/contract) type) for full compatibility with Effector's ecosystem without additional interop. Just wrap your zod schema into adapter and use as usual [_Contract_](/protocols/contract).

### Farfetched

[Farfetched](https://ff.effector.dev) is the advanced data fetching tool for web applications based of Effector. It suggests to ensure that data received from the server is conforms desired [_Contract_](/protocols/contract).

```ts
import { createQuery } from '@farfetched/core';
import { z } from "zod";
import { zodContract } from "@withease/zod";

const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: StatusSchema,
  species: z.string(),
  type: z.string(),
  gender: GenderSchema,
  origin: z.object({ name: z.string(), url: z.string() }),
  location: z.object({ name: z.string(), url: z.string() }),
  image: z.string(),
  episode: z.array(z.string()),
});

const characterQuery = createQuery({
  effect: createEffect(async (config: { id: number; }) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${config.id}`);
    return response.json();
  }),
  // after receiving data from the server
  // check if it is conforms the Contract to ensure
  // API does not return something unexpected
  contract: zodContract(CharacterSchema),
});
```

### Integration with other libraries

Since *zodContract* (`@withease/zod`) is compatible [_Contract_](/protocols/contract) protocol it can be used with any library that supports it.

The full list of libraries that support _Contract_ protocol can be found [here](/protocols/contract).
