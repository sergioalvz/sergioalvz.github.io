---
layout: post
title:  "Custom bash prompt w/ Mercurial info"
tags:   util
---

Last month I've started to use **UNIX** terminal very frequently. I'm also using **Mercurial** as DVCS and **Ruby** as my main programming language at work. Because of this, I was googling for some intereseting resources for being able to customize my prompt to see important info about what is my current branch and bookmark when I'm *in* some Mercurial's repository.

After read interesting posts about this ([Mercurial Bash Prompts](http://stevelosh.com/blog/2009/03/mercurial-bash-prompts/) and X), I was able to do the following Gist (`--mode VERBOSE` :P):

{% gist 9231177 %}

which produces a prompt with this scheme: `@user in @current_directory @hg_branch @hg_bookmark @hg_state`. The information about Mercurial branch, bookmark and status is only visible when the current directory is a Mercurial repository.

![Screenshot]({{ site.url }}/assets/colors-prompt-hg.png)
