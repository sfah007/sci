var proxy_url_form_name       = 'poxy_url_form';  
var proxy_settings_form_name  = 'poxy_settings_form';
var flags_var_name            = 'hl';

/* the variables above should match the $config variables in index.php */

var alpha1 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
var alpha2 = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM';
var alnum  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._';

function str_rot13(str)
{
    var newStr = '';
    var curLet, curLetLoc;

    for (var i = 0; i < str.length; i++)
    {
        curLet    = str.charAt(i);
        curLetLoc = alpha1.indexOf(curLet);

        if (curLet == '#')
        {
           window.document.getElementById('proxy_form').action += str.substring(i, str.length)
        }

        newStr += (curLetLoc < 0) ? curLet : alpha2.charAt(curLetLoc);
     }

    return newStr;
}


function base64_encode( data ) {	// Encodes data with MIME base64
	// 
	// +   original by: Tyler Akins (http://rumkin.com)
	// +   improved by: Bayron Guevara

	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

	do { // pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1<<16 | o2<<8 | o3;

		h1 = bits>>18 & 0x3f;
		h2 = bits>>12 & 0x3f;
		h3 = bits>>6 & 0x3f;
		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string
		enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);

	switch( data.length % 3 ){
		case 1:
			enc = enc.slice(0, -2) + '==';
		break;
		case 2:
			enc = enc.slice(0, -1) + '=';
		break;
	}

	return enc;
}


function submit_form()
{
    var url           = document.forms[proxy_settings_form_name].url.value;
    var flags         = '';
    var rotate13      = document.forms[proxy_settings_form_name].elements['ops[]'][5].checked
    var base64        = document.forms[proxy_settings_form_name].elements['ops[]'][6].checked;

    for (i = 0; i < document.forms[proxy_settings_form_name].elements['ops[]'].length; i++)
    {
        flags += (document.forms[proxy_settings_form_name].elements['ops[]'][i].checked == true) ? '1' : '0';
    }

    document.forms[proxy_url_form_name].elements[flags_var_name].value = flags;
    document.forms[proxy_url_form_name].target = (document.forms[proxy_settings_form_name].new_window.checked == true) ? '_blank' : '_top';

    if (rotate13)
    {
        url = str_rot13(url);
    }
    else if (base64)
    {
        url = base64_encode(url);
    }

    document.forms[proxy_url_form_name].url_input.value = url;
    document.forms[proxy_url_form_name].submit();
    return false;
}
