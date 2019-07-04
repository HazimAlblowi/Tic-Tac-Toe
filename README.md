# Tic-Tac-Toe
---
## Project Overview:

A web based tic tac toe game. 

- **[Link to the game](https://hazimalblowi.github.io/Tic-Tac-Toe/)**
- **[Link to the user stories](https://github.com/HazimAlblowi/project-1-prompt#user-stori)**
- **[Link to the wireframe](/images/wireframe.png)**

## Technologies/Frameworks Used:
- **HTML**
- **CSS**
- **Javascript**

## Approach:
I started by drawing the frame work, then I went straight to the logic and build a game that can be played on console without needing of the HTML page, using  array as the playing field. after that I worked in the style by using css and DOM manuplation. After that I worked in the animation of the token by using SVG. Finally I starter working with live database from Firebase to implement  online mutliplayer but I ran out of time before I had chance to complete it.

## Struggles:
The only thing I had stuck on was a problem with the elements inside the SVG doesn't show up on screen, even though they are added in the DOM when I checked for them in the chrome inspect.
The problem was solved using this line of code after appending the elements in SVG elements
`lineSvg.innerHTML = lineSvg.innerHTML;`
while looking at this code it looks like it will do nothing  but it somehow fixed the problem, and the drawing inside the SVG rendred in the page.
I tried to look for explaination in the web but my effort went fruitless.
my only assume its that the line of code I wrote rerender the SVG on the page.

## New Things I Learned:
- Creating and animate SVG using only css.
- Working with Google Firebase and link,write on and read from the live database.

## Uncomplete features:
- Build online mutilplayer using live database from using Google Firebase. (completed creating and searching for online rooms).

## Features I would've added if I Had more time:
- AI opponent.
- The Ability to change the style.
- Add sounds effects.

**Tools**
**[Wireframe](https://wireframe.cc/)**: used to design the wireframe.



