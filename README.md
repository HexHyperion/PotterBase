# PotterBase, a PotterDB data explorer for SWM
Daaamn, what a journey that was! Seeing the language for the first time, writing this thing for 2 weeks straight using the documentation and packages written by people I (probably) have met in person in the office... But hey, I think as my first project ever made in React Native and a second one ever made in TypeScript, it's not that bad :P
## Features (if I didn't miss anything)
- Fetches data from the PotterDB API (obviously)
- Lists everything in categories (yup, one of my additional features is the fact that I handle _everything_, not only characters :D )
- Functional pagination with the ability to enter an exact page number
- Standard search by title/name, independent for every category
- Filter menu with memory and multiple simultaneous filters
- Pop-up detail page with images and all usable information from the API (with the ability to extract things like potion colors and use them)
- Additional chapter explorer for books (after making it I found out that in the DB only the first book has summaries... But it does _support_ them, if they were there)
- 5 different color themes saved between launches - Hogwarts houses and OLED black (I don't recognize the rights of light themes, this is a conscious decision) - by the way, the colors can look weird on the emulator, but on a physical phone they are perfectly fine - looks like the VM has a _really_ small color space (but you've probably noticed that already)
- Fonts and icons from the world of Harry Potter
- ...and a lot of my heart (and life) that went into this, as you can probably see from my activity chart :P
## Installation
To install the app on your Android phone, you can download the newest .apk from the [Releases](https://github.com/HexHyperion/PotterBase/releases) page. Below are the steps to open the project on your computer:
1. Clone the repository using your favourite method. I will be using Git:
```
git clone https://github.com/HexHyperion/PotterBase
```
2. With Node.js installed, navigate into the cloned directory and install all dependencies:
```
npm install
```
3. After the installation process has finished, open the Android Emulator or connect your own device using `adb`, and type the command below to start the development server:
```
npm run android
```
4. If the app doesn't open automatically, press `a` to open it on your default Android device.
5. And that's it! If I didn't break anything, obviously :P
