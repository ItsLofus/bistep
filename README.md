# bistep.js

A lightweight library for encrypting strings.
Uses a simple Bi-Step/Cycle based encryption. Remember to hide your keys appropriately.
Strings are order and case sensitive.
# Installation
	npm install bistep

# Usage
	var bistep = require('bistep');
	var SomeKey = "AD2h";
	var EncryptedString = bistep.Encrypt("Some thing", SomeKey);
	var DecryptedString = bistep.Decrypt("]R{lzW9pNJ", SomeKey);
	
	//Do something with the strings
	console.log(EncryptedString + " --> " + DecryptedString);

# Change Log
	v1.1.1:
		Added support for the character ' '
	v1.1:
		Fixed bug with numbers not being supported
		Removed support for escape sequences 
			(Was causing headaches when hardcoding encrypted strings)
			Left in support for the '\' character
	v1.0:
		Original Code
	
# FAQ
## Q: What characters does bistep accept?
A: bistep takes the following characters:
```
var acceptableCharacters = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890=:;{},.[]*!@#$%^&-_+|~`<>()/\\ ";
```
These are the only characters you can use in you strings. Also the only characters valid of keys.

## Q: Decrypt isn't working! I'm getting a string that still looks encrypted!
A: Likely you are sending over a character in your string that is not supported. 
Check to make sure that your program isn't translating any characters without you knowledge.

## Q: I need to send bistep a string with an unsupported character, what do I do?
A: Many different ways to handle this, but the thought is the same. Convert your string into an acceptable format using some method.
Many have found Base64 translations to be useful. Give bistep a Base64 string, it'll encrypt it, and then it'll decrypt back into the sent Base64 string.
