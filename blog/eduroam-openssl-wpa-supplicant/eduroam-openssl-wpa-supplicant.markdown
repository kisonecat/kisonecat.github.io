---
layout: post
title: eduroam, OpenSSL 3, and wpa_supplicant 
tags: personal
date: 2022-10-03 01:46:39
---

This is a story about [NixOS](https://nixos.org/), which is a Linux distribution based around declarative configuration.  When using NixOS, instead of editing a variety of config files and installing packages one by one, the user edits a `configuration.nix` which describes how to generate the system.

This is not always easier, but on the whole I *very* much like NixOS.  It's wonderful to have a record of what I've done to configure my machines, to share `configuration.nix` across multiple machines.

And sometimes I am very impressed with how cleanly NixOS solves certain problems.

Last week, I was not able to connect to `eduroam` after upgrading OpenSSL.  Running `journalctl -u wpa_supplicant.service` revealed

```
wpa_supplicant[2213]: SSL: SSL3 alert: write (local SSL3 detected an error):fatal:handshake failure
wpa_supplicant[2213]: OpenSSL: openssl_handshake - SSL_connect error:0A000152:SSL routines::unsafe legacy renegotiation disabled
```

So this seemed to be an issue with OpenSSL not supporting certain legacy protocols.

Some searching revealed that [James Ralston](https://www.spinics.net/lists/hostap/msg09840.html)
discussed this issue and described a patch to `wpa_supplicant` to
support legacy servers.  Here's `eduroam.patch`:

```
--- wpa_supplicant-2.10/src/crypto/tls_openssl.c	2022-01-16 15:51:29.000000000 -0500
+++ src/crypto/tls_openssl.c.legacy	2022-09-29 10:10:02.999974141 -0400
@@ -1048,7 +1048,7 @@
 
 	SSL_CTX_set_options(ssl, SSL_OP_NO_SSLv2);
 	SSL_CTX_set_options(ssl, SSL_OP_NO_SSLv3);
-
+        SSL_CTX_set_options(ssl, SSL_OP_LEGACY_SERVER_CONNECT);
 	SSL_CTX_set_mode(ssl, SSL_MODE_AUTO_RETRY);
 
 #ifdef SSL_MODE_NO_AUTO_CHAIN
```

This patch sets `SSL_OP_LEGACY_SERVER_CONNECT` which, in older
versions of OpenSSL, had been set by default.  From an older version
of `man SSL_clear_options`:

> The option SSL_OP_LEGACY_SERVER_CONNECT is currently set by default
> even though it has security implications: otherwise it would be
> impossible to connect to unpatched servers (i.e. all of them
> initially) and this is clearly not acceptable. Renegotiation is
> permitted because this does not add any additional security issues:
> during an attack clients do not see any renegotiations anyway.
> 
> As more servers become patched the option
> SSL_OP_LEGACY_SERVER_CONNECT will not be set by default in a future
> version of OpenSSL.
> 
> OpenSSL client applications wishing to ensure they can connect to
> unpatched servers should always set SSL_OP_LEGACY_SERVER_CONNECT

To set the `SSL_OP_LEGACY_SERVER_CONNECT` option in `wpa_supplicant`,
I added the following stanza to my `configuration.nix`:

```
nixpkgs.config.packageOverrides = pkgs: rec {
  wpa_supplicant = pkgs.wpa_supplicant.overrideAttrs (attrs: {
    patches = attrs.patches ++ [ ./eduroam.patch ];
  });
};
```

So now when I rebuild my system (with the 2.10 version of
`wpa_supplicant`), this patch is applied.  There are other ways of
dealing with this, like messing with `openssl.cnf` to set
`SSL_OP_LEGACY_SERVER_CONNECT` globally, or changing how
`wpa_supplicant` is invoked to with the environment variable
`OPENSSL_CONF` pointing to custom configuration.
