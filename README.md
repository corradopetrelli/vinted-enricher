<p align="center">
  <img width="180" src="logo.png" />
</p>
<h1 align="center">
 Vinted Enriched
</h1>

Built using TypeScript

# Table of contents

- [Table of contents](#table-of-contents)
- [Usage](#usage)
- [Development](#development)
- [Contribute](#contribute)


# Motivation

I use Vinted everyday for shopping but it don't provide some feature that are very useful to me, like:
- On the catalog I want to see shipping details
- On the catalog I want to see where the seller is from

# Usage

- Install extension
- Search something on Vinted catalog
- Magic!

# Development

Install dependencies by running:

```sh
pnpm install
```

Then build the project:

```sh
pnpm run build
```

To run a development version with live reload, run:

```sh
pnpm run dev:chrome
```

Or open Google Chrome and open the Extension Management page by navigating to `chrome://extensions` or by opening Settings and clicking Extensions from the bottom left.

Enable Developer Mode by clicking the toggle switch next to Developer mode.

Click the "Load Unpacked" button and select the extension directory(`.../dist`).