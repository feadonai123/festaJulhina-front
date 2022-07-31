import cookieCutter from 'cookie-cutter'

class CookieStorage {
  static get = (name) => cookieCutter.get(name);

  static set = (name, value) => cookieCutter.set(name, value);

  static clear = (name) => cookieCutter.set(name, '', { expires: new Date(0) });
}

export default CookieStorage;
