#date-calculator

A minuscule tool for doing date calculations with basic natural support. First add in your starting date, and then either add or subtract time, or add a second date. We'll do the rest, and give you a range of useful time formats. Created for fun, modified for the [10k apart contest](https://a-k-apart.com).

Check out the live demo [here](http://calculatedates.com)

__The page currently sits at 3.4KB after minification + gzipping__

##What we did to squeeze our website into as few kibbles as possible:
- HTML/CSS/JavaScript minification
- As much JavaScript encapsulation as possible to get maximum minification.
- Minimal class/variable names
- Gzipping

##Compilation:
Run `make`, which will run our ruby script to generate index.html (minified), and index.html.gz (minified + gzipped)

###Ruby gems used:
- [HTML Press](https://github.com/stereobooster/html_press)
- [CSS Minify](https://github.com/matthiassiegel/cssminify)
- [Uglifier](https://github.com/lautis/uglifier)

_Created by: [Sunmock (Sunny) Yang](http://sunmock.com) and [Russell (Rusty) Baylis](http://imrusty.com/)_
