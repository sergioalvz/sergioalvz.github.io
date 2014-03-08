---
layout: post
title: "My Sublime Text 2 setup"
tags: dev util
---

Recently I've started to use Sublime Text 2 as my main working tool for coding. Formerly, my experience was specially focus on Eclipse (because the JVM was my very main platform) and also recently I've been playing with IntelliJ IDEA for doing my Master Thesis by using Scala (although my latest Scala shell scripts have been done by using Sublime Text too...)

Sublime has a really nice bunch of plug-ins which can be used for customizing almost every aspect of the editor. I specially like the way that custom settings can be put for overriding the default Sublime configuration. Sublime uses JSON for specifying the different settings. It has 2 files, the default preferences file and the user's preferences file (where the user has to override the desired properties). This philosophy is used across all the configurations which can be done in Sublime (plug-ins custom settings, key shortcuts, etc)

IME, I've seen the next properties really useful for working day by day with Sublime:

````json
{
  "bold_folder_labels": true, # useful for quickly identifying folders at sidebar
  "ensure_newline_at_eof_on_save": true, # self-explanatory
  "highlight_line": true, # highlights the line with the focus
  "highlight_modified_tabs": true, # improves the signal for indicating unsaved tabs
  "spell_check": true, # useful if you use Sublime also for non-coding stuff
  "tab_size": 2, # spaces per tab
  "translate_tabs_to_spaces": true, # self-explanatory
  "trim_trailing_white_space_on_save": true, # removes unnecessary white spaces on save
  "draw_white_space": "all" # self-explanatory
}
````

<div class="warning">
<p>Be careful if you copy &amp; paste the previous properties in your preferences file, JSON does not admit comments and they are only used for explaining each property.</p>
</div>

And also the following key mappings:

````json
[
  { "keys": ["super+shift+f"], "command": "reindent"},
  { "keys": ["super+0"], "command": "focus_side_bar" },
  { "keys": ["super+shift+r"], "command": "show_panel", "args": {"panel": "find_in_files"} }
]
````

### Useful plug-ins

#### Package Control

It does not need too much explanation. The [Package Control](https://sublime.wbond.net/) is the package manager for Sublime Text which allows you to easily install several plugins from the central repository. The installation is pretty simple, as is explained on [their own website](https://sublime.wbond.net/installation).

#### RubyTest

Once I started to use Sublime for developing on Ruby, my colleague [@dcarral](http://www.twitter.com/dcarral) told me about [this wonderful plug-in](https://github.com/maltize/sublime-text-2-ruby-tests) for running the specs and show the results summary.

Some of its key-features are:

* Quickly switching between classes and their related spec.
* Works with Ruby Unit Tests, Cucumber and RSpec
* Different profiles for running a single spec, all the specs, single test, etc.

<div class="attention">
<p>This week I've seen some weird behavior when running specs for models where their file name starts with "test_" (probably because it is some kind of reserved word).</p>
</div>

#### SublimeLinter

[This plug-in](https://github.com/SublimeLinter/SublimeLinter-for-ST2) is really useful for checking at real-time lexical mistakes (and almost semantical mistakes, when enabling the JSLint) in the code.

It has linters for checking the following languages:

* C/C++
* CoffeeScript
* CSS
* Git Commit Messages
* Haml
* HTML
* Java
* JavaScript
* Lua
* Objective-J
* Perl
* PHP
* Puppet
* Python
* Ruby
* Squirrel
* XML

### Look and feel

As *bonus*, I recommend you to take a look to the several themes that are available for free for Sublime Text 2, in order to customize the look and feel for being more comfortable when using the editor. Currently, I'm using [Soda](https://github.com/buymeasoda/soda-theme/) theme and [Tomorrow Night Eighties](https://github.com/chriskempson/tomorrow-theme) color scheme.

Ops, if you also see the Sublime's icon a bit *ugly*, there are [pretty much alternatives](http://dribbble.com/search?q=sublime+text) out there for replacing it.
