import { router } from "expo-router";
import React, { useContext, useEffect } from "react";
type AnyFunction = (...args: any[]) => any;

export interface NavigationHelper {
  navigateWithCallback: (options: {
    pathname: string;
    key?: string;
    params: any;
    merge?: boolean;
    callback: AnyFunction;
  }) => void;
  pushWithCallback: (options: {
    pathname: string;
    key?: string;
    params: any;
    merge?: boolean;
    callback: AnyFunction;
  }) => void;
  replaceWithCallback: (options: {
    pathname: string;
    key?: string;
    params: any;
    merge?: boolean;
    callback: AnyFunction;
  }) => void;
}

const contextRef = React.createContext(new Map<string, AnyFunction>());

function randomStringId() {
  return (new Date().getTime().toString() + Math.random().toString()).replace(
    ".",
    "",
  );
}

export function useNavigationHelper(): NavigationHelper {
  const callbackMap = useContext(contextRef);
  return {
    navigateWithCallback(options) {
      if (!options.callback) {
        throw Error("options.callback can not be null");
      }
      const id = randomStringId();
      callbackMap.set(id, options.callback);
      router.navigate({
        ...options,
        //@ts-expect-error we have a variable route with types routing enabled
        pathname: options.pathname,
        params: {
          ...options?.params,
          callbackHandle: id,
        },
      });
    },
    pushWithCallback(options) {
      if (!options.callback) {
        throw Error("options.callback can not be null");
      }
      const id = randomStringId();
      callbackMap.set(id, options.callback);
      router.push({
        ...options,
        //@ts-expect-error we have a variable route with types routing enabled
        pathname: options.pathname,
        params: {
          ...options?.params,
          callbackHandle: id,
        },
      });
    },
    replaceWithCallback(options) {
      if (!options.callback) {
        throw Error("options.callback can not be null");
      }
      const id = randomStringId();
      callbackMap.set(id, options.callback);
      router.replace({
        ...options,
        //@ts-expect-error we have a variable route with types routing enabled
        pathname: options.pathname,
        params: {
          ...options?.params,
          callbackHandle: id,
        },
      });
    },
  };
}

export function useNavigationCallback(
  callbackHandle: string,
  autoCleanUp = true,
): { callback: AnyFunction | undefined; cleanUpCallback: () => void } {
  const callbackMap = useContext(contextRef);
  const callback = callbackMap.get(callbackHandle);
  if (!callback) {
    console.warn(
      "CallBack not foud .. dit you forget to pass one .. or is it a repeat call and has it been cleaned  up because of autoCleanUp ?",
    );
  }

  const cleanUpCallback = () => {
    callbackMap.delete(callbackHandle);
  };

  useEffect(() => {
    return () => {
      // clear callback object to avoid memory leak
      if (autoCleanUp) cleanUpCallback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { callback, cleanUpCallback };
}
