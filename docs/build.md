# Building ACCESSANGEL
## Getting the source
Clone the source from GitHub:
```
git clone git@github.com:HandsFree/accessabar.git
cd accessabar
```

## Dependencies
All that's needed is an up to date version of [Yarn](https://yarnpkg.com/) to install all the dependencies. 

Install instructions for Yarn can be found here: [https://yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install).

### Installing Dependencies
To install the dependencies, run the following command in the root directory:
```
yarn install
```

## Building
Once dependencies have been installed, build ACCESSANGEL with the following command:
```
yarn run build
```

Build files will be outputted to `./public/dist/accessabar`.

For more information about adding ACCESSANGEL to a website, go [here](add_to_website.md).
