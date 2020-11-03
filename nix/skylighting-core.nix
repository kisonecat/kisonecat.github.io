{ mkDerivation, aeson, ansi-terminal, attoparsec, base
, base64-bytestring, binary, blaze-html, bytestring
, case-insensitive, colour, containers, criterion, Diff, directory
, filepath, HUnit, hxt, mtl, pretty-show, QuickCheck, random
, regex-pcre-builtin, safe, stdenv, tasty, tasty-golden
, tasty-hunit, tasty-quickcheck, text, transformers, utf8-string
}:
mkDerivation {
  pname = "skylighting-core";
  version = "0.8.5";
  sha256 = "c7a54765d3c735f6abd31bdb4ae80677cbcf16a0f9cca90846e11286dec1ecab";
  isLibrary = true;
  isExecutable = true;
  libraryHaskellDepends = [
    aeson ansi-terminal attoparsec base base64-bytestring binary
    blaze-html bytestring case-insensitive colour containers directory
    filepath hxt mtl regex-pcre-builtin safe text transformers
    utf8-string
  ];
  testHaskellDepends = [
    aeson base bytestring containers Diff directory filepath HUnit
    pretty-show QuickCheck random tasty tasty-golden tasty-hunit
    tasty-quickcheck text
  ];
  benchmarkHaskellDepends = [
    base containers criterion directory filepath text
  ];
  homepage = "https://github.com/jgm/skylighting";
  description = "syntax highlighting library";
  license = stdenv.lib.licenses.bsd3;
}
