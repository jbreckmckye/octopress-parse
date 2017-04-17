# octopress-parse
I knocked up some utils to parse Octopress post stats.

## parse-categories.js

Analyses the stats / categories of your posts. It can list all the tags in your blog and all the files that possess a certain tag.

This is helpful when you want to clean up and rationalise your categories: you can see how many near-duplicates you have ('videogames', 'video games' and 'video-games', for instance) and which posts have a tag you'd like to get rid of.

### Listing tags

Just pass in a directory of posts:

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

### Listing posts with a tag

Add the tag as a secondary parameter:

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
