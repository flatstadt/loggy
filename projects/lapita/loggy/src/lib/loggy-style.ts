// tslint:disable no-console
// tslint:disable max-line-length
export interface LoggyStyle {
  separator: string;
  debug: string;
  log: string;
  info: string;
  warn: string;
  error: string;
}

export const defaultStyle: LoggyStyle = {
  separator: '#',
  debug: 'background: white; color: black;',
  log: 'background: purple; color: white;',
  info: 'background: blue; color: white;',
  warn: 'background: orange; color: black;',
  error: 'background: red; color: white;',
};
