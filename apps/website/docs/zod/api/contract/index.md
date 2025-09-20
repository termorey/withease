# zodContract

Adapter, initially created for [_Contracts_](/protocols/contract) that allows you to introduce data validation of the application.

## Usage as a _Contract_

`@withease/zod` is an adapter based on `@withease/contract` (used only [_Contract_ protocol](/protocols/contract) type) for full compatibility with Effector's ecosystem without additional interop. Just wrap your zod schema into adapter and use as usual [_Contract_](/protocols/contract).

### Farfetched

[Farfetched](https://ff.effector.dev) is the advanced data fetching tool for web applications based of Effector. It suggests to ensure that data received from the server is conforms desired [_Contract_](/protocols/contract).

```ts
import { createQuery } from '@farfetched/core';
import { z } from 'zod';
import { zodContract } from '@withease/zod';

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
  effect: createEffect(async (config: { id: number }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${config.id}`
    );
    return response.json();
  }),
  // after receiving data from the server
  // check if it is conforms the Contract to ensure
  // API does not return something unexpected
  contract: zodContract(CharacterSchema),
});
```

### Integration with other libraries

Since _zodContract_ (`@withease/zod`) is compatible [_Contract_](/protocols/contract) protocol it can be used with any library that supports it.

The full list of libraries that support _Contract_ protocol can be found [here](/protocols/contract).
