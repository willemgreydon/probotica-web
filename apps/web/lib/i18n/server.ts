import 'server-only';
import { cookies } from 'next/headers';
import { LOCALE_COOKIE, DEFAULT_LOCALE, isLocale, type Locale } from './config';
import { getDict, translate } from './dictionaries';

/** Current locale from the cookie (server components). */
export async function getServerLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** A `t(path)` translator for server components, bound to the request locale. */
export async function getServerT(): Promise<(path: string) => string> {
  const dict = getDict(await getServerLocale());
  return (path: string) => translate(dict, path);
}
