# varss

A scss library for working with CSS Variables


## Install

```cli
npm i varss -D
```

## Usage

Basically you make use of a mixin `var-set` for variable definition in conjunction with a function `var-get` for accessing your variable as css custom property. You can pass in maps as well and get back maps containing css variables then accordingly.

Here's a complete example...

```scss
// variables.scss
$var-prefix: prefix-;
$var-style: camelCase;

:root {
  @include var-set((
    borderWidth: 1px,
    borderRadius: 3px,
    fontSize: 12px,
    context: (
      primary: blue,
      secondary: orange
    ),
    inverse: (
      primary: white,
      secondary: black
    )
  ));
}
```

```scss
// Button.scss
.Button {
  -webkit-appearance: none;
  cursor: pointer;
  padding: 0.25rem 0.1rem;
  border-style: solid;
  border-radius: var-get('borderRadius');
  border-width: var-get('borderWidth');
  font-size: var-get('fontSize');

  // You may either refer to variables by their flat name...
  &--outline#{&}--primary {
    border-color: var-get('contextPrimary');
    color: var-get('contextPrimary');
  }

  &--outline#{&}--secondary {
    border-color: var-get('contextSecondary');
    color: var-get('contextSecondary');
  }

  // Or access lists and maps as specified via `var-set`
  @each $name, $value in var-get('context') {
    &--#{$name}:not(&--outline) {
      border-color: $value;
      background: $value;
      color: map-get(var-get('inverse'), $name);
    }
  }
}

```

Output:

```css
:root {
  --prefix-borderWidth: 1px;
  --prefix-borderRadius: 3px;
  --prefix-fontSize: 12px;
  --prefix-contextPrimary: blue;
  --prefix-contextSecondary: orange;
  --prefix-inversePrimary: white;
  --prefix-inverseSecondary: black;
}

.Button {
  -webkit-appearance: none;
  cursor: pointer;
  padding: 0.25rem 0.1rem;
  border-style: solid;
  border-radius: var(--prefix-borderRadius);
  border-width: var(--prefix-borderWidth);
  font-size: var(--prefix-fontSize);
}

.Button--outline.Button--primary {
  border-color: var(--prefix-contextPrimary);
  color: var(--prefix-contextPrimary);
}

.Button--outline.Button--secondary {
  border-color: var(--prefix-contextSecondary);
  color: var(--prefix-contextSecondary);
}

.Button--primary:not(.Button--outline) {
  border-color: var(--prefix-contextPrimary);
  background: var(--prefix-contextPrimary);
  color: var(--prefix-inversePrimary);
}

.Button--secondary:not(.Button--outline) {
  border-color: var(--prefix-contextSecondary);
  background: var(--prefix-contextSecondary);
  color: var(--prefix-inverseSecondary);
}
```

> Note: `varss` is intented for being used at application level and is currently not suited for being incorporated into a dedicated scss library

## Development

In order to run specs, issue the following from your terminal:

```cli
npm test
```

Run dev-server

```cli
npm start
```

Create a build (for whatever purpose)

```cli
npm run build
```
