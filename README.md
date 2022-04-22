# Navigation API Types

[![npm](https://img.shields.io/npm/v/navigation-api-types.svg?style=flat-square)](https://www.npmjs.com/package/navigation-api-types)

Type definition for [`Navigation API`](https://github.com/WICG/navigation-api)

### Install

```shell
$ npm i -D navigation-api-types
```

### tsconfig.json

`navigation-api-types` needs to be added to `types` because it uses _ambient_ types that modify the global types.

```json
{
  "compilerOptions": {
    "types": [
        "./node_modules/navigation-api-types"
    ]
  }
}
```

## License

This project is licensed under the [MIT License](https://github.com/lukewarlow/navigation-api-types/blob/master/LICENSE).
