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

Reference JavaScript code:

```javascript
function log() {
    console.log('HTB JavaScript Deobfuscation Module');
}
```

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

Example:

```javascript
function log(){console.log('HTB JavaScript Deobfuscation Module');}
```

### Packing JavaScript Code

A packer obfuscation tool usually attempts to convert all words and symbols of the code into a list or dictionary and then refer to them using the ```(p,a,c,k,e,d)``` function to re-build the original code during execution.

[JavaScript Obfuscator](https://beautifytools.com/javascript-obfuscator.php) can do this.

You can still see the code's main strings written in cleartext, which may reveal some of its functionality.

Example:

```javascript
eval(function(p,a,c,k,e,d){e=function(c){return c};if(!''.replace(/^/,String)){while(c--){d[c]=k[c]||c}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5.4(\'3 2 1 0\');',6,6,'Module|Deobfuscation|JavaScript|HTB|log|console'.split('|'),0,{}))
```

## Advanced Obfuscation

### Obfuscator

[Obfuscator.io](https://obfuscator.io/) offers vast possibilities to obfuscate code.

Example:

```javascript
function _0xd65f(){var _0x582764=['ndi4mgXuzhDPva','mtm5otyZnMDmrMXwzW','mZu0ndryBNzSAfm','mZi1nZuYB29oy2Pq','nduYn01Mugfqra','Bg9N','ntGWmJi1tLzTAM5b','mZm4mNDwDg5LzG','mJKYmZC3txfVu3HY','nZvwqK10zLa','sfrciePHDMfty3jPChqGrgvVyMz1C2nHDgLVBIbnB2r1Bgu'];_0xd65f=function(){return _0x582764;};return _0xd65f();}(function(_0x4a3aa3,_0x411be0){var _0x1e9ee4=_0x45a4,_0xa5fac8=_0x4a3aa3();while(!![]){try{var _0x17c591=parseInt(_0x1e9ee4(0x1fa))/0x1+-parseInt(_0x1e9ee4(0x1f9))/0x2+parseInt(_0x1e9ee4(0x1fb))/0x3*(-parseInt(_0x1e9ee4(0x1f4))/0x4)+parseInt(_0x1e9ee4(0x1f8))/0x5+parseInt(_0x1e9ee4(0x1f5))/0x6+parseInt(_0x1e9ee4(0x1f3))/0x7+-parseInt(_0x1e9ee4(0x1fd))/0x8*(parseInt(_0x1e9ee4(0x1f6))/0x9);if(_0x17c591===_0x411be0)break;else _0xa5fac8['push'](_0xa5fac8['shift']());}catch(_0xf9456c){_0xa5fac8['push'](_0xa5fac8['shift']());}}}(_0xd65f,0x29965));function _0x45a4(_0x2add91,_0x179ba0){var _0xd65fe4=_0xd65f();return _0x45a4=function(_0x45a42b,_0x508f1f){_0x45a42b=_0x45a42b-0x1f3;var _0x3dc77b=_0xd65fe4[_0x45a42b];if(_0x45a4['uCSJhx']===undefined){var _0x41aecf=function(_0x7765f8){var _0x589b67='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x2f73aa='',_0x10af8e='';for(var _0x3fedd8=0x0,_0x374963,_0x4babe6,_0x2cabfc=0x0;_0x4babe6=_0x7765f8['charAt'](_0x2cabfc++);~_0x4babe6&&(_0x374963=_0x3fedd8%0x4?_0x374963*0x40+_0x4babe6:_0x4babe6,_0x3fedd8++%0x4)?_0x2f73aa+=String['fromCharCode'](0xff&_0x374963>>(-0x2*_0x3fedd8&0x6)):0x0){_0x4babe6=_0x589b67['indexOf'](_0x4babe6);}for(var _0x2825a3=0x0,_0x59432c=_0x2f73aa['length'];_0x2825a3<_0x59432c;_0x2825a3++){_0x10af8e+='%'+('00'+_0x2f73aa['charCodeAt'](_0x2825a3)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x10af8e);};_0x45a4['FzCtFf']=_0x41aecf,_0x2add91=arguments,_0x45a4['uCSJhx']=!![];}var _0xbf141f=_0xd65fe4[0x0],_0x528d57=_0x45a42b+_0xbf141f,_0x590290=_0x2add91[_0x528d57];return!_0x590290?(_0x3dc77b=_0x45a4['FzCtFf'](_0x3dc77b),_0x2add91[_0x528d57]=_0x3dc77b):_0x3dc77b=_0x590290,_0x3dc77b;},_0x45a4(_0x2add91,_0x179ba0);}function log(){var _0xace078=_0x45a4;console[_0xace078(0x1f7)](_0xace078(0x1fc));}
```

### JSFuck

[JSFuck](https://jsfuck.com/) brings obfuscation onto another level, making it completely unreadable.

Example:

```javascript
[][(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+[![]]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+!+[]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[!+[]+!+[]])+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]])()((![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[+!+[]+[+!+[]]]+[+!+[]]+([]+[]+[][(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[!+[]+!+[]]])
```

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