- [JavaScript Deobfuscation](#javascript-deobfuscation)
  - [Source Code](#source-code)
    - [HTML](#html)
    - [CSS](#css)
    - [JavaScript](#javascript)
  - [Code Obfuscation](#code-obfuscation)
  - [Basic Obfuscation](#basic-obfuscation)
    - [Minifying JavaScript Code](#minifying-javascript-code)
    - [Packing JavaScript Code](#packing-javascript-code)
  - [Advanced Obfuscation](#advanced-obfuscation)
    - [Obfuscator](#obfuscator)
    - [JSFuck](#jsfuck)
  - [Deobfuscation](#deobfuscation)
    - [Beautify](#beautify)
    - [Deobfuscate](#deobfuscate)

---

# JavaScript Deobfuscation

## Source Code

Most websites nowadays utilize JavaScript to perform their functions. While HTML is used to determine the website's main fields and parameters, and CSS is used to determine its design, JavaScript is used to perfom any functions necessary to run the website. This happens in the background.

### HTML

By pressing ```CTRL + U``` you get to see the source view of a website which contains the HTML source code.

### CSS

... is either defined internally within the same HTML file between ```<style>``` elements, or defined in a separate ```.css``` file and referenced within the HTML code.

### JavaScript

... can also be written internally between ```<script>``` elements or written into a separate ```.js``` file and referenced within the HTML code.

## Code Obfuscation

... is a technique used to make a script more difficult to read by humans but allows the same from a technical point of view, though performance may be slower. This is usually achieved by using an obfuscation tool, which takes code as an input, and attempts to re-write the code in a way that is much more difficult to read, depending on its design.

JavaScript is usually used within browsers at the client-side, and the code is sent to the user and executed in cleartext. This is why obfuscation is very often used with it.

## Basic Obfuscation

### Minifying JavaScript Code

... is a common way of reducing the readability of a snippet of JavaScript code while keeping it fully functional. The entire code is in a single line.

[JavaScript-Minifier](https://www.toptal.com/developers/javascript-minifier) can do this.

### Packing JavaScript Code

A packer obfuscation tool usually attempts to convert all words and symbols of the code into a list or dictionary and then refer to them using the ```(p,a,c,k,e,d)``` function to re-build the original code during execution.

[JavaScript Obfuscator](https://beautifytools.com/javascript-obfuscator.php) can do this.

You can still see the code's main strings written in cleartext, which may reveal some of its functionality.

## Advanced Obfuscation

### Obfuscator

[Obfuscator.io](https://obfuscator.io/) offers vast possibilities to obfuscate code.

### JSFuck

[JSFuck](https://jsfuck.com/) brings obfuscation onto another level, making it completely unreadable.

## Deobfuscation

### Beautify

In order to properly format minfied code, you need to beautify the code. That is possible through the Browser Dev Tools.

1. click ```CTRL + SHIFT + Z```
2. go to debugger
3. choose the ```.js``` file
4. look for curly braces on the bottom bar
5. beautify

There are also many online tools that can beautify the code:

- [Prettier](https://prettier.io/playground/)
- [Beautifier](https://beautifier.io/)

### Deobfuscate

There are many online tools that can deobfuscate the code.

[UnPacker](https://matthewfl.com/unPacker.html) can do this.