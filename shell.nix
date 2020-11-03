{ nixpkgs ? import <nixpkgs> {}, compiler ? "ghc884" }:
nixpkgs.lib.overrideDerivation
  (import ./default.nix { inherit nixpkgs compiler; }).env
  (old:
   { buildInputs = old.buildInputs ++
       (with nixpkgs.haskell.packages.${compiler}; [
       cabal-install
     # more deps can go here
    ]);})
