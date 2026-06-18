import { delay, MonoTypeOperatorFunction } from 'rxjs';

export function mockDelay<T>(min = 500, max = 1500): MonoTypeOperatorFunction<T> {
  const ms = Math.floor(min + Math.random() * (max - min));
  return delay(ms);
}

export function mockDelayFixed<T>(ms = 800): MonoTypeOperatorFunction<T> {
  return delay(ms);
}

export function shouldSimulateError(rate = 0.05): boolean {
  return Math.random() < rate;
}
