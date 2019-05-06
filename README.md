# Kludgy CLI

Command Line Interface for [kludgy](https://github.com/mhulse/kludgy).

While you can read about [Kludgy’s API in it’s WIKI](https://github.com/mhulse/kludgy/wiki), here’s how to get Kludgy’s CLI running on your macOS:

```bash
# Install Kludgy’s CLI from GitHub directly:
$ npm i -g mhulse/kludgy-cli

# Read the docs:
$ kludgy -h
Usage: kludgy -k <Google Maps API key>

Options:
  --version        Show version number                                 [boolean]
  --key, -k        Your Google Maps API key                  [string] [required]
  --directory, -d  Output directory?                                    [string]
  --fisheye, -f    Fisheye? Choose one: both, big-sky, tiny-planet, random
                                                                        [string]
  --debug          Debug? Choose one: 0, 1, 2                           [number]
  -h, --help       Show help.                                          [boolean]

# Next, run the code!
# Make sure your terminal is not full-screen and you’re focused on the
# desktop that you want the image to appear as the background:
$ kludgy -d="~/Dropbox (Personal)/panos"  -f=both -k="<Google Maps API key>" --debug=1
```
