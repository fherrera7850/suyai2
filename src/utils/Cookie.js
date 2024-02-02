export const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookie;
};

export const getCookie = (name) => {
  if (!document.cookie) return false;
  
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(name))
    .split('=')[1];
  return cookie ? decodeURIComponent(cookie) : '';
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};