import { type ZodType as ZodTypeV3, type ZodError as ZodErrorV3, type TypeOf as TypeOfV3 } from 'zod/v3';
import {
  type $ZodType as ZodTypeV4,
  type output as TypeOfV4,
  type $ZodError as ZodErrorV4,
  safeParse,
} from 'zod/v4/core';
import { type Contract } from '@withease/contracts';

type ZodAnyType = ZodTypeV3 | ZodTypeV4;
type ZodAnyError = ZodErrorV3 | ZodErrorV4;

type Output<T extends ZodAnyType> = T extends ZodTypeV4
  ? TypeOfV4<T>
  : T extends ZodTypeV3
    ? TypeOfV3<T>
    : never;

type ErrorTransformer = (issues: ZodAnyError) => ReturnType<Contract<unknown, unknown>['getErrorMessages']>;

function isZodV4(schema: unknown): schema is ZodTypeV4 {
  return !!schema && typeof schema === 'object' && '_zod' in schema;
}

const standardErrorTransformer: ErrorTransformer = (error) => {
  return error.issues.map((e) => {
    const path = e.path.join('.');
    return path !== '' ? `${e.message}, path: ${path}` : e.message;
  });
}

/**
 * Transforms Zod contracts for `data` to internal Contract.
 * Any response which does not conform to `data` will be treated as error.
 *
 * @param {ZodTypeV3 | ZodTypeV4} data Zod Contract for valid data
 */
function zodContract<T extends ZodAnyType>(
  data: T
): Contract<unknown, Output<T>> {
  function isData(prepared: unknown): prepared is Output<T> {
    if (isZodV4(data)) return safeParse(data, prepared).success;
    return data.safeParse(prepared).success;
  }

  return {
    isData,
    getErrorMessages(raw) {
      const validation = isZodV4(data)
        ? safeParse(data, raw)
        : data.safeParse(raw);
      if (validation.success) {
        return [];
      }

      return standardErrorTransformer(validation.error);
    },
  };
}

export { zodContract };
