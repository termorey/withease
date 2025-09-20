# Compatibility

The best practice is to use a supported version of [Zod](https://zod.dev/). Preferably, opt for Zod@4. However, we recognize the need to support transitional versions to assist with migrations.

## With zod@^4

You can use standard zod import.

```ts
import { z } from "zod";
import { zodContract } from '@withease/zod';
```

## With zod@^3.25.0

You still can use latest versions of zod@3 for migrations we support it.

```ts
import { z } from "zod/v3";
import { zodContract } from '@withease/zod';
```

## Before zod@3.25.0

You can use adapter from [Farfetched](https://ff.effector/)

```ts
import { z } from "zod";
import { zodContract } from '@farfetched/zod';
```
