## Requirements

You must have npm version 4+ and NodeJS version 6+ installed in your system.

Optional:Set up Android SDK and AVD as mentioned in the [official documentation](https://facebook.github.io/react-native/docs/getting-started.html). [This](https://www.youtube.com/watch?v=KRLLjlpy0r4) is a great video tutorial on the same by Traversy Media on YouTube.

Install CRNA and [NativeBase](https://docs.nativebase.io/docs/GetStarted.html) for projects created with CRNA.

Download and install the [Expo app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en) in your android device for instant previewing.

## How to get it running

Clone this repository and run `npm install`. Once npm downloads the dependecies (and this might take a while) run `npm start`, then either scan the QR code generated or enter the URL shown into the search bar of your Expo app.

### Specific things to fix

* Find a way to put images, fonts etc in an assets folder and load it from there, because the obvious way to do it doesn't work for some reason.

* Redo FABs with TouchableNativeFeedback so as to get circular ripple effect
