{ nixpkgs ? import <nixpkgs> {}, compiler ? "default" }:
(nixpkgs.pkgs.haskell.packages.${compiler}.override {
    overrides = self: super: {
      pandoc = nixpkgs.pkgs.haskell.lib.dontCheck (self.callPackage ./nix/pandoc.nix {});
      pandoc-types = self.callPackage ./nix/pandoc-types.nix {};
      jira-wiki-markup = self.callPackage ./nix/jira-wiki-markup.nix {};            
      hslua = self.callPackage ./nix/hslua.nix {};
      skylighting = self.callPackage ./nix/skylighting.nix {};
      skylighting-core = self.callPackage ./nix/skylighting-core.nix {};              
    };
  }
).callPackage ./homepage.nix {}
