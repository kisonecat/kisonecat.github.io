{ nixpkgs ? import <nixpkgs> {}, compiler ? "default" }:
(nixpkgs.pkgs.haskell.packages.${compiler}.override {
    overrides = self: super: {
      pandoc = nixpkgs.pkgs.haskell.lib.dontCheck (self.callPackage ./nix/pandoc.nix {});
      pandoc-types = self.callPackage ./nix/pandoc-types.nix {};
      jira-wiki-markup = self.callPackage ./nix/jira-wiki-markup.nix {};            
      hslua = self.callPackage ./nix/hslua.nix {};
      skylighting = self.callPackage ./nix/skylighting.nix {};
      skylighting-core = self.callPackage ./nix/skylighting-core.nix {};
      latex-svg-image = let f = nixpkgs.fetchFromGitHub {
        owner  = "phadej";
        repo   = "latex-svg";
        rev    = "9767ad5def1050b36e87c1a5e6386f32a9ad3daf";
        sha256 = "sha256-4+0QHmXwupEIdHQR7LAnC86qV1Avpjt9YLuzlO22IeQ=";
      }; in nixpkgs.haskell.lib.doJailbreak (self.callCabal2nix "latex-svg-image" "${f}/latex-svg-image" {});
    };
  }
).callPackage ./homepage.nix {}
