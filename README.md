# MT Leg Chart builder

Tool to visualize votes by the Montana legislature, inspired by Quartz's [Chartbuilder](http://quartz.github.io/Chartbuilder/). See in operation [here](http://www.bozemandailychronicle.com/app/newsroom/vote-mapper/).

Intended for hosting on an in-house server. Users can copy information from the state [legislative services site](http://leg.mt.gov/css/default.asp) and produce html snippets for embedding in [BLOX CMS](bloxcms.com) HTML assets.

Output code assumes jQuery and Bootstrap CSS/JS is present on website for some styling and tooltip interactivity.

HTML generator uses D3.js for DOM manipulation and assorted utility functions. Also uses [html2canvas](https://html2canvas.hertzen.com/) for generating downloadable static images suitable for sharing on social media.