{{{
  "title": "Detecting &#8220;cat-like&#8221; typing.",
  "tags": ["personal"],
  "date": "2006-09-27T20:51:06+00:00"
}}}

  There is a program called [PawSense](http://www.bitboost.com/pawsense/) for Windows which detects "cat-like" typing, and then prevents further keyboard entry.

I found some [code](http://osxbook.com/book/bonus/chapter2/alterkeys/) for filtering keyboard events on Mac OS X, and I wanted to implement something similar.  But this raises an interesting question: just what characterizes "cat-like" typing?

The PawSense website suggested that cat paws are very broad, and usually strike nearby keys simultaneously.  Another idea is to detect "human-like" typing and then freeze the keyboard whenever non-human typing is detected (which has the useful feature of detecting a future version of cat with smaller paws).

