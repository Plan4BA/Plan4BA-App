import * as appSettings from 'application-settings';

export function getString(key: string): string {
  return appSettings.getString(key);
}

export function setString(key: string, value: string) {
  appSettings.setString(key, value);
}

export function removeString(key: string) {
  appSettings.remove(key);
}
