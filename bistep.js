module.exports = {
	
	/* Lightweight Bi-Step/Cycle based encryption by Anselm Teather*/
	/* Import these functions when handling important strings */
	/* Not super secure, but pretty impossible to brute force */
	/* Becareful about importing these to the client side*/	
	
	/*                    Change Log
	v1.2.0:
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
	*/

	/*------    START bistep.js   -----*/
	//v1.2.0
	
	
	
	//The following tend to support characters that aren't in the acceptableCharacters string.
	//Converts to/from Base64 before/after encryption/decryption
	FullEncrypt: function(data, key)
	{
		var EncodedData = new Buffer(data).toString('base64');
		return Encrypt(EncodedData,key);
	},
	
	FullDecrypt: function(data, key)
	{
		var EncodedData = Decrypt(data, key);
		return (new Buffer(EncodedData, 'base64').toString('ascii'));
	},
	
	

	Encrypt: function(data, key)
	{
		var acceptableCharacters = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890=:;{},.[]*!@#$%^&-_+|~`<>()/\\ \"";	//Order sensitive so if you change this, then re-encrypt your strings
		var bitKey = [];
		
		for(var i = 0; i <= key.length - 1; i++)
		{
			
			var value;
			for(var e = 0; e <= acceptableCharacters.length - 1; e++)
			{
				if(acceptableCharacters.charAt(e) == key.charAt(i))
				{
					value = e;
					break;
				}
			}
			bitKey.push(value);
		}
		
		var keyPos = 0;
		var result = "";
		for(var i = 0; i <= data.length - 1; i++)
		{
			var value;
			for(var e = 0; e <= acceptableCharacters.length - 1; e++)
			{
				if(acceptableCharacters.charAt(e) == data.charAt(i))
				{
					value = e;
					break;
				}
			}
			
			value += bitKey[keyPos];
			if(value >= acceptableCharacters.length)
			{
				value -= acceptableCharacters.length;
			}
			
			result += acceptableCharacters.charAt(value);
			keyPos++;
			if(keyPos >= key.length)
			{
				keyPos = 0;
			}
		}
		

		return result;
	},


	Decrypt: function(data, key)
	{
		var acceptableCharacters = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890=:;{},.[]*!@#$%^&-_+|~`<>()/\\ \"";	//Order sensitive so if you change this, then re-encrypt your strings
		var bitKey = [];
		for(var i = 0; i <= key.length - 1; i++)
		{
			
			var value;
			for(var e = 0; e <= acceptableCharacters.length - 1; e++)
			{
				if(acceptableCharacters.charAt(e) == key.charAt(i))
				{
					value = e;
					break;
				}
			}
			bitKey.push(value);
		}
		
		var keyPos = 0;
		var result = "";
		
		for(var i = 0; i <= data.length -1; i++)
		{
			var value;
			for(var e = 0; e <= acceptableCharacters.length - 1; e++)
			{
				if(acceptableCharacters.charAt(e) == data.charAt(i))
				{
					value = e;
					break;
				}
			}
			
			value -= bitKey[keyPos];
			if(value <= -1)
			{
				value += acceptableCharacters.length;
			}
			
			result += acceptableCharacters.charAt(value);
			keyPos++;
			if(keyPos >= key.length)
			{
				keyPos = 0;
			}
		}
		
		return result;
	}

};
