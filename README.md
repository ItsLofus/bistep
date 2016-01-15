bistep.js

~~~~~~~~~
~~~~~~~~~

A lightweight library for encrypting strings.
Uses a simple Bi-Step/Cycle based encryption. Remember to hide your keys appropriately.

## Installation
	npm install bistep

## Usage
	var bistep = require('bistep');
	var EncryptedString = bistep.Encrypt("Some thing", "AD2h");
	var DecryptedString = bistep.Decrypt("]R{lzW9pNJ", "AD2h");

## Change Log
v1.1.1:
	Added support for the character ' '
v1.1:
	Fixed bug with numbers not being supported
	Removed support for escape sequences 
		(Was causing headaches when hardcoding encrypted strings)
		Left in support for the '\' character
v1.0:
    Original Code
	