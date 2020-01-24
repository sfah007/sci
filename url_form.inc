<script type="text/javascript">	if (typeof parent.nav == 'undefined' && top.location == self.location) document.location.href = '/index.php?url='+document.location.href.substring(document.location.href.indexOf('?q=')+3); </script>
<script src="javascript.js" type="text/javascript"></script>
<script type="text/javascript">parent.nav.document.getElementById('url').value='<?php echo $this->url ?>'; parent.nav.document.getElementById('wait').style.display = 'none';function wait(){parent.nav.document.getElementById('wait').style.display='inline';}</script>
<!--<div style="position:fixed;right:0px;background:#666;color:#fff;top:50%;height:110px;width:60px;">Some text</div>-->

<script type="text/javascript">
	function addXMLRequestCallback(callback){
		var oldSend, i;
		if( XMLHttpRequest.callbacks ) {
			XMLHttpRequest.callbacks.push( callback );
		} else {
			XMLHttpRequest.callbacks = [callback];
			var oldOpen = XMLHttpRequest.prototype.open;
			XMLHttpRequest.prototype.open = function(method, url, async, user, pass)
			{
				var url_new;
				for( i = 0; i < XMLHttpRequest.callbacks.length; i++ )
					url_new = XMLHttpRequest.callbacks[i](url);
				oldOpen.call(this, method, url_new, async, user, pass);
			};
		}
	}
	addXMLRequestCallback( function( url ) {
		var base_scheme = '<?php echo $this->base['scheme'] ?>';
		var base_host = '<?php echo $this->base['host']; ?>';
		var base_port = '<?php echo $this->base['port']; ?>';
		var base_file = '<?php echo $this->base['file']; ?>';
		var base_url = '<?php echo $this->base['base']; ?>';
		if (url[0]=='/')
			url = base_scheme + '://' + base_host + url;
		if (url[0]=='?')
			url = base_url + '/' + base_file + url;
		if (url.substring(0,7)!='http://' && url.substring(0,8)!='https://')
			url = base_url + '/' + url;
		//console.log(url);
		var proxy = '<?php echo urlencode($this->current_proxy->name); ?>';
		//console.log(proxy);
		if (url.substring(0,18)!='http://sci-hub.org')
			url = '/browser.php?ref='+proxy+'&q='+encodeURIComponent(base64_encode(url));
		return url;
	});
</script>