## WeTransfer Automation CLI

[![npm version](https://badge.fury.io/js/wetransfer-cli.svg)](https://badge.fury.io/js/wetransfer-cli)

Upload files to WeTransfer directly from your terminal using browser automation.

### Installation

Install WeTransfer CLI globally

```bash
yarn global add wetransfer-cli
```

or

```bash
npm install -g wetransfer-cli
```

or without installation

```bash
npx wetransfer upload <path_to_your_file>
```

### Usage

#### Upload

Upload files with the `wetransfer` command:

```bash
wetransfer upload <path_to_your_file>
```

Example:

```bash
wetransfer upload ./myfile.txt
```
