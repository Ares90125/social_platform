export const getCookieByName = (name: string): string | null => {
  if ('cookie' in document) {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((row) => row.startsWith(`${name}=`));

    if (!cookie) {
      return null;
    }

    return cookie.split('=')[1];
  }

  return null;
};

export const setCookie = (
  name: string,
  value: string,
  expirationDateInDays: number = 3650,
): void => {
  const nowInSeconds = new Date().getTime() / 1000;
  const dateInSeconds = nowInSeconds + expirationDateInDays * 24 * 60 * 60;
  const expires = `; expires=${new Date(dateInSeconds * 1000).toUTCString()}`;

  document.cookie = `${name}=${value || ''}${expires}; path=/;`;
};

export const deleteCookie = (name: string): void => {
  setCookie(name, '', 0);
};
