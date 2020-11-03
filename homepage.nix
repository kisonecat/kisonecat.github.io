{ mkDerivation, base, blaze-html, containers, extra, filepath
, hakyll, latex-svg-hakyll, latex-svg-image, latex-svg-pandoc
, pandoc, pandoc-citeproc, pandoc-types, pcre-heavy, pcre-light
, stdenv, text, time
}:
mkDerivation {
  pname = "homepage";
  version = "0.1.0.0";
  src = ./.;
  isLibrary = false;
  isExecutable = true;
  executableHaskellDepends = [
    base blaze-html containers extra filepath hakyll latex-svg-hakyll
    latex-svg-image latex-svg-pandoc pandoc pandoc-citeproc
    pandoc-types pcre-heavy pcre-light text time
  ];
  license = "unknown";
  hydraPlatforms = stdenv.lib.platforms.none;
}
