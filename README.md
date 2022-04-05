# Stylis-js 


[Stylis](https://github.com/thysultan/stylis) for CSS-in-JS to CSS. Inspired by PostCss-js

stylis-js uses [Stylis](https://github.com/thysultan/stylis), a lightweight css preprocessor. \
stylis-js allows creation of CSS with the power of JS. 

---

## Usage

### Compile CSS-in-JS to CSS

```js
StylisJS().css.stringified(
  {
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "f4f4f4",
    },
  },
  ".card",
  {
    isProcess: true,
    hasPrefixer: true,
  }
);

// result
// .card{background-color:#f5f5f5;}.card:hover{background-color:f4f4f4;}

```

## Parameters

### cssObject - object
e.g:
```js
{
  transform: "translateX(-50px)",
  &:hover: {
    transform: "translateX(0)"
  }
}
```
### queryName - string
e.g: 
```js
 ".card"
 "#header"
  div
  main
```

### processOptions - object
#### isProcess
process css string using stylis

#### hasPrefixes
tell stylis if process string should have browser prefixes

e.g: 
```js
  {
    isProcess: true,
    hasPrefixes: true,
  }
```
