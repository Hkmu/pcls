export type DecoratorsType =
  | { [id: string]: any }
  | Array<string>
  | null
  | undefined;

let _prefix: string = "";
export function setPrefix(prefix: string) {
  _prefix = prefix.trim();
}

export function pcls(
  name: string,
  decorators?: DecoratorsType,
  propCls?: string
): string {
  name = name.trim();

  if (!name.length) return name;

  const userCls: Array<string> = [name].concat(
    parseDecorators(name, decorators)
  );
  const prefixedCls: string = addPrefix(userCls);

  return propCls ? `${prefixedCls} ${propCls}` : prefixedCls;
}

function parseDecorators(name: string, d: DecoratorsType): Array<string> {
  if (!d) return [];

  const ret: Array<string> = [];

  if (Array.isArray(d)) {
    for (let i = 0, l = d.length; i < l; i++) {
      const _d = d[i].trim();
      _d.length && ret.push(`${name}-${_d}`);
    }

    return ret;
  }

  for (const key in d) {
    if (d[key]) {
      const k = key.trim();
      k.length && ret.push(`${name}-${k}`);
    }
  }
  return ret;
}

function addPrefix(classnames: Array<string>): string {
  return classnames.reduce((a, b) => a + " " + _prefix + b, "").trim();
}
