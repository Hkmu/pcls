export type ComponentModifier =
  | ComponentModifierValue
  | ComponentModifierArray
  | ComponentModifierMapping;
type ComponentModifierArray = Array<ComponentModifier>;
type ComponentModifierMapping = Record<ComponentModifierValue, any>;
type ComponentModifierValue = string | number;

// The prefix for all classes.
let _prefix: string = "";
export function setPrefix(prefix: string) {
  if (typeof prefix !== "string") return;
  _prefix = prefix.trim().length ? `${prefix.trim()}-` : "";
}

export function pcls(
  componentName: string,
  componentModifier: ComponentModifier = []
): string {
  if (
    typeof componentName !== "string" ||
    !(componentName = componentName.trim()).length
  )
    return "";

  const classNames: Array<string> = [componentName].concat(
    flatten(componentName, componentModifier)
  );

  return addPrefix(classNames);
}

function flatten(
  componentName: string,
  componentModifier: ComponentModifier
): Array<string> {
  const ret: Array<string> = [];

  if (
    typeof componentModifier === "string" ||
    typeof componentModifier === "number"
  ) {
    const modifier = componentModifier.toString().trim();
    if (modifier) {
      ret.push(componentName + "-" + modifier);
    }
    return ret;
  }

  if (Array.isArray(componentModifier)) {
    for (const modifier of componentModifier) {
      ret.push(...flatten(componentName, modifier));
    }

    return ret;
  }

  if (typeof componentModifier === "object") {
    for (const modifier in componentModifier) {
      const shouldKeep = !!componentModifier[modifier];
      if (shouldKeep) {
        ret.push(...flatten(componentName, modifier));
      }
    }
    return ret;
  }

  return ret;
}

function addPrefix(classNames: Array<string>): string {
  return classNames
    .reduce((final, className) => `${final} ${_prefix + className}`, "")
    .trim();
}
