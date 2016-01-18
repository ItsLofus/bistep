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
	
# Documentation
## FullEncrypt() / FullDecrypt()
This set of functions was introduced in version v1.2. 


The Full functions are useful for using strings with unsupported characters or for another layer of security.
They convert to/from Base64 before/after encryption/decryption.

### Example
In this example we see how to the character '"' is able to be encrypted when it is not an acceptable character.
Just using Encrypt/Decrypt() here would result in errors and unexpected characters.
```
var bistep = require('bistep');
var SomeKey = "Excc23";
var EncryptedString = bistep.FullEncrypt("She said, \"Stuff happens.\"", SomeKey);
var DecryptedString = bistep.FullDecrypt("%^jn(([FcYc!;1LV5(^K2k_._@Dxlj>XNk(y", SomeKey);

//Do something with the strings
console.log(EncryptedString + " --> " + DecryptedString);
//Output:
//%^jn(([FcYc!;1LV5(^K2k_._@Dxlj>XNk(y --> She said, "Stuff happens."
```

# Change Log
	v1.2:
		Added FullEncrypt()
		Added FullDecrypt()
		
		---> (This update does not require you to re-encrypt strings) <---
		
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
Check to make sure that your program isn't translating any characters without your knowledge.

## Q: I need to send bistep a string with an unsupported character, what do I do?
A: Many different ways to handle this, but the thought is the same. Convert your string into an acceptable format using some method.
Using FullEncrypt() and FullDecrypt() might be able to fix you issue, and is also safe for use.

## Q: Help! I cannot decrypt my string that I used FullEncrypt() for!
A: Strings encrypted with FullEncrypt() will be first converted Base64, and then are encrypted. 
So trying to run Decrypt() on the resulting string will return the Base64. You must translate out of Base64 to get your original string.
It is recommended to use FullDecrypt() on a full encrypted string, as it will return your original string.
