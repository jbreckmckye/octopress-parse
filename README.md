# octopress-parse
I knocked up some utils to parse Octopress post stats.

## parse-categories.js

Analyses the stats / categories of your posts. It runs in two modes: an 'overview' of the categories in your library, listing each tag and the number of matches, and a 'search' mode listing all the posts that match a particular tag.

This is helpful when you want to clean up and rationalise your tags: if I've decided that 'videogames', 'video games' and 'video-games' should all be amalgamated into a single tag, I can see which one I've used more and which files might be using the undesirable alternatives.

To use in **'overview'** mode, just pass in a directory to analyse:

`node parse-categories.js D:/Octopress/source/_posts`

It'll give you an output like the following:

```
Analysing all categories from 42 posts
ux -- 6 files
front-end -- 7 files
css -- 1 files
accessibility -- 1 files
screen readers -- 1 files
functional tests -- 1 files
```

To use in **'search'** mode, add an extra argument for the tag to zoom in on:

`node parse-categories.js D:/Octopress/source/_posts front-end`

This will list the matching posts:

```
Finding posts with category front-end
[ '2014-03-15-form-elements-box-models-quirks-and-you.markdown',
  '2014-04-21-document-loading-and-DOM-lifecycle-events.markdown',
  '2014-05-11-javascript-curry.markdown',
  '2014-05-29-why-i-prefer-parasitic-inheritance.markdown',
  '2014-08-05-slideshow-breaking-the-1000ms-time-to-glass-mobile-barrier.markdown',
  '2014-09-21-style-only-part-of-a-line-part-with-raphael-dot-js.markdown',
  '2014-10-04-a-simple-group-checkbox-for-knockout-dot-js.markdown' ]
```
