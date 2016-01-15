module.exports = {
	
	/* Lightweight Bi-Step/Cycle based encryption by Anselm Teather*/
	/* Import these functions when handling important strings */
	/* Not super secure, but pretty impossible to brute force */
	/* Becareful about importing these to the client side*/	
	
	/*                    Change Log
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

	/*------    START bistep.js -----*/
	//v1.1

	//These two are order sensitive so if you change them, then re-encrypt your strings
	var AN_EXAMPLE_KEY = "BBEV";
	var acceptableCharacters = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890=:;{},.[]*!@#$%^&-_+|~`<>()/\\ ";


	Encrypt: function(data, key)
	{
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
	}


	Decrypt: function(data, key)
	{
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