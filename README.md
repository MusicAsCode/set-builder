## Set Player

Play audio loops in web browser. React component, downloads playlist of elements. Use UI to mute/solo tracks. All tracks play at the same time. All tracks use ToneJS transport-based synchronization to ensure musical cohesion.

Written for React using TypeScript (enforcing strong types). Using Axios for API communication and React Hooks for triggers.

### Getting Started

* CodeSandbox for this repo is hosted here: https://codesandbox.io/s/musicascode-set-player-kqz3t so you can see what we have so far. This project is WORK-IN-PROGRESS at earliest stage possible. Almost nothing works. However attention to React, TypeScript, ToneJs, Axios, OpenID is of paramount importance to us going forward.

### Roadmap

1. Ability to play same length loops, same tempo loops.
2. Browsing of assets is possible from MusicAsCode API (to be documented)

### Contributions

You don't have to strictly follow steps below. But codesandbox is great for sharing, immediate verifications and github pull request submissions.

1. setup codesandbox.io account (login using github)
2. import sandbox from github (https://github.com/MusicAsCode/set-player)
3. using codesandobx github icon on the right, create fork of this repo into your github space, you will be able to edit and save files into your own fork and then submit changes to main project using pull requests mechanism

NOTE: because of fsevents 1.2.9 requirements, yarn will not build with optional requirements on linux. you're welcome to experiment with npm however we will only accept depdendencies if managed by yarn

### License

This project is under MIT License (c) 2019-2020 Music As Code
