import type { Ref } from "vue";
import { ref } from "vue";
import { AxiosError as AxiosErrorFromImport } from "axios";

export interface RequestError {
  message: string;
  code: number;
}
interface ErrorRequest {
  message?: string;
}

type AsyncFunction<TResult, TArgs extends unknown[] = []> = (
  ...args: TArgs
) => Promise<TResult>;

interface UseAsyncReturn<TResult, TError, TArgs extends unknown[]> {
  data: Ref<TResult | null>;
  error: Ref<TError | null>;
  loading: Ref<boolean>;
  execute: (...args: TArgs) => Promise<TResult | null>;
  abort: () => void;
  reset: () => void;
}

export const useAsync = <
  TResult,
  TError = RequestError,
  TArgs extends unknown[] = [],
>(
  asyncFn: AsyncFunction<TResult, TArgs>,
  options?: {
    context?: unknown;
    abortable?: boolean;
  },
): UseAsyncReturn<TResult, TError, TArgs> => {
  const data = ref<TResult | null>(null) as Ref<TResult | null>;
  const error = ref<TError | null>(null) as Ref<TError | null>;
  const loading = ref(false);
  const abortController = ref<AbortController | null>(null);

  const execute = async (...args: TArgs): Promise<TResult | null> => {
    try {
      loading.value = true;
      error.value = null;
      data.value = null;

      if (options?.abortable) {
        abortController.value?.abort();
        abortController.value = new AbortController();

        const argsWithSignal = [
          { signal: abortController.value.signal },
          ...args,
        ] as TArgs;
        data.value = options?.context
          ? await asyncFn.call(options?.context, ...argsWithSignal)
          : await asyncFn(...argsWithSignal);
      } else {
        data.value = options?.context
          ? await asyncFn.call(options?.context, ...args)
          : await asyncFn(...args);
      }

      return data.value;
    } catch (err) {
      if (err instanceof AxiosErrorFromImport) {
        const e: AxiosErrorFromImport<ErrorRequest, RequestError> = err;
        error.value = {
          message: e.response?.data?.message || `Failed run ${asyncFn.name}`,
          code: e.response?.status || 0,
        } as TError;
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const abort = () => {
    abortController.value?.abort();
    loading.value = false;
  };

  // onScopeDispose(() => {
  //   abort();
  // });

  // if (options?.immediate) {
  //   execute(...([] as TArgs)).catch(() => {});
  // }

  function reset() {
    error.value = null;
  }

  return {
    data,
    error,
    loading,
    execute,
    abort,
    reset,
  };
};
