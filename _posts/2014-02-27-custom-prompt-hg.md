---
layout: post
title:  Custom bash prompt w/ Mercurial info
date:   2014-02-27 20:00:00 +0100
tags:   util

# For escaping braces
branch: "{{branch}}"
bookmark: "{{bookmark}}"
---

Last month I've started to use **UNIX** terminal very frequently because I'm using **Mercurial** as DVCS and **Ruby** as my main programming language at work. Then, I *googled* how to customize my bash prompt to see important info about what is my current branch and bookmark when I'm *in* some Mercurial's repository.

After find and read some interesting posts about the topic ([Mercurial Bash Prompts](http://stevelosh.com/blog/2009/03/mercurial-bash-prompts/) and [Changing Your Shell Prompt](http://itsmetommy.com/2011/02/09/changing-your-shell-prompt/)), I was able to add the following code to the `~/.bashrc` (`--mode VERBOSE` :P):

````bash
# -------
# Add to ~/.bashrc
#
# Requisites: install 'prompt' extension for Mercurial:
# http://mercurial.selenic.com/wiki/PromptExtension
# -------
hg_branch() {
  hg prompt "{{page.branch}}" 2> /dev/null
}

hg_bookmark() {
  hg prompt "{{page.bookmark}}{status}" 2> /dev/null
}

export PS1='\n\[\e[1;31m\]\u\[\e[m\] in \[\e[1;32m\]\w\[\e[m\] \
[\[\e[1;36m\]$(hg_branch)\[\e[m\] \[\e[1;33m\]$(hg_bookmark)\[\e[m\]] $ '
````

which produces a prompt with this scheme:

````
@user in @current_directory @hg_branch @hg_bookmark @hg_state $
````
The information about Mercurial branch, bookmark and status is only visible when the current directory is a Mercurial repository.

![Screenshot](/assets/posts/colors-prompt-hg.png)
