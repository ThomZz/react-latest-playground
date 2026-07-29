export interface LocalizedString {
  default: string;
  fr?: string;
}

export interface Team {
  name: LocalizedString;
  commonName: LocalizedString;
  abbrev: LocalizedString;
  logo: string;
  logoDark: string;
}
