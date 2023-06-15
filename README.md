## pcls

`pcls` is not a direct alternative to `classnames` or `clsx`. Its utility is primarily limited to scenarios involving the development of a UI library.

### Install

```shell
npm i pcls
```

or

```shell
yarn add pcls
```

### Usage

```typescript
import { pcls } from "pcls";

type Props = {
  type?:
    | "primary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "light"
    | "dark";
  size?: "sm" | "md" | "lg";
  status?: "loading" | "disabled";
};

function Button(props) {
  const { type, size, status, className, ...restProps } = props;

  // Will produce `btn btn-danger btn-md ...`
  const cls = pcls("btn", {
    [`${size}`]: size,
    [`${type}`]: type,
    [`${status}`]: status,
  });

  return <button className={`${cls} ${className}`} {...restProps} />;
}
```

You can add prefix for all class names by calling `setPrefix` in the root file.

```typescript
import { setPrefix } from "pcls";

setPrefix("bs");
// setPrefix('antd');
// setPrefix('spectrum');
// setPrefix('mantine');
// setPrefix('chakra');
```

Then `pcls` call of the former example will produce: `my-btn my-btn-danger my-btn-md ...`.

### API

#### pcls(name: string, modifiers?: ComponentModifier): string

#### setPrefix(prefix: string)

### Thanks

- [classnames](https://github.com/JedWatson/classnames/)
- [clsx](https://github.com/lukeed/clsx)

### License

MIT
