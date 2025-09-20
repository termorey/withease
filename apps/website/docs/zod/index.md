<script setup>
import pkg from '../../../../packages/zod/package.json';

const maxSize = pkg['size-limit'].at(0).limit;
</script>

# @withease/zod

Small adapters (less than **{{maxSize}}** summary controlled by CI) for [Zod](https://zod.dev/) package support.

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

Best way of usage - use a supported zod version. zod@4 is preferred.\
But we understand the need to maintain a transitional versions to assist with migrations.\
[Read more](./compatibility)

## API

- [zodContract](./api/contract/)
