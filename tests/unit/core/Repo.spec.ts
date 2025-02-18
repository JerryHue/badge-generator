import { Repo } from "@/core/Repo";

describe("#Repo", () => {
  const repoNoLicense = new Repo("MichaelCurrin", "badge-generator");
  const repoWithLicense = new Repo("MichaelCurrin", "badge-generator", "MIT");

  describe("Error handling on initialization", () => {
    it("throws an error on empty username", () => {
      expect(() => new Repo("", "badge-generator")).toThrow();
    });

    it("throws an error on empty repo name", () => {
      expect(() => new Repo("MichaelCurrin", "")).toThrow();
    });
  });

  describe("#ghURL", () => {
    it("returns a valid GitHub repo URL", () => {
      expect(repoNoLicense.ghURL()).toBe(
        "https://github.com/MichaelCurrin/badge-generator"
      );
    });
  });

  describe("#_ghPagesURL", () => {
    it("returns a valid GitHub Pages project URL", () => {
      expect(repoNoLicense._ghPagesURL()).toBe(
        "https://michaelcurrin.github.io/badge-generator/"
      );
    });

    it("returns a valid GitHub Pages user URL", () => {
      const repoNoLicense = new Repo(
        "MichaelCurrin",
        "MichaelCurrin.github.io"
      );

      expect(repoNoLicense._ghPagesURL()).toBe(
        "https://michaelcurrin.github.io"
      );
    });
  });

  describe("#ghPagesBadge", () => {
    it("returns a valid GitHub Pages badge", () => {
      const badgeUrl =
        "https://img.shields.io/badge/View_site-GH_Pages-2ea44f?style=for-the-badge";
      const linkTarget = "https://michaelcurrin.github.io/badge-generator/";
      const expectedBadge = `[![View site - GH Pages](${badgeUrl})](${linkTarget})`;

      expect(repoNoLicense.ghPagesBadge()).toBe(expectedBadge);
    });
  });

  describe("#_issuesURL", () => {
    it("returns a valid generate issues URL", () => {
      expect(repoNoLicense._issuesURL()).toBe(
        "https://github.com/MichaelCurrin/badge-generator/issues"
      );
    });
  });

  describe("#_templateURL", () => {
    it("returns a valid generate template URL", () => {
      expect(repoNoLicense._templateURL()).toBe(
        "https://github.com/MichaelCurrin/badge-generator/generate"
      );
    });
  });

  describe("#useThisTemplateBadge", () => {
    it("returns a valid generate template badge", () => {
      const badgeUrl =
        "https://img.shields.io/badge/Generate-Use_this_template-2ea44f?style=for-the-badge";
      const target =
        "https://github.com/MichaelCurrin/badge-generator/generate";

      expect(repoNoLicense.useThisTemplateBadge()).toBe(
        `[![Use this template](${badgeUrl})](${target})`
      );
    });
  });

  describe("#_tagBadgeUrl", () => {
    it("returns a correct tag badge URL", () => {
      expect(repoNoLicense._tagBadgeUrl("tag")).toBe(
        "https://img.shields.io/github/tag/MichaelCurrin/badge-generator?include_prereleases=&sort=semver"
      );
    });

    it("returns a correct release badge URL", () => {
      expect(repoNoLicense._tagBadgeUrl("release")).toBe(
        "https://img.shields.io/github/release/MichaelCurrin/badge-generator?include_prereleases=&sort=semver"
      );
    });
  });

  describe("#tagBadge", () => {
    it("returns a correct tag badge", () => {
      const badgeUrl =
        "https://img.shields.io/github/tag/MichaelCurrin/badge-generator?include_prereleases=&sort=semver";
      const target =
        "https://github.com/MichaelCurrin/badge-generator/releases/";

      expect(repoNoLicense.tagBadge("tag")).toBe(
        `[![GitHub tag](${badgeUrl})](${target})`
      );
    });

    it("returns a correct release badge", () => {
      const badgeUrl =
        "https://img.shields.io/github/release/MichaelCurrin/badge-generator?include_prereleases=&sort=semver";
      const target =
        "https://github.com/MichaelCurrin/badge-generator/releases/";

      expect(repoNoLicense.tagBadge("release")).toBe(
        `[![GitHub release](${badgeUrl})](${target})`
      );
    });
  });

  describe("#licenseBadge", () => {
    it("returns a null string when there is no license set", () => {
      expect(repoNoLicense.licenseBadge(true)).toBe("");
    });

    it("returns a badge for a local license", () => {
      expect(repoWithLicense.licenseBadge(true)).toBe(
        "[![License](https://img.shields.io/badge/License-MIT-blue)](#license)"
      );
    });

    it("return a badge for a remote license", () => {
      const badgeUrl = "https://img.shields.io/badge/License-MIT-blue";
      const target =
        "https://github.com/MichaelCurrin/badge-generator/blob/main/LICENSE";

      expect(repoWithLicense.licenseBadge(false)).toBe(
        `[![License](${badgeUrl})](${target})`
      );
    });
  });

  describe("#licenseMessage", () => {
    it("return a correct license message for a known license type and local file", () => {
      const message = `\
## License

Released under [MIT](/LICENSE) by [@MichaelCurrin](https://github.com/MichaelCurrin).
  `;
      expect(repoWithLicense.licenseMessage()).toBe(message);
    });

    it("return an empty license message for no license type", () => {
      expect(repoNoLicense.licenseMessage()).toBe("");
    });
  });

  describe("#ghBadge", () => {
    it("return a valid GH repo badge", () => {
      const badgeUrl =
        "https://img.shields.io/static/v1?label=MichaelCurrin&message=badge-generator&color=blue&logo=github";
      const linkTarget = "https://github.com/MichaelCurrin/badge-generator";

      expect(repoNoLicense.ghBadge()).toBe(
        `[![MichaelCurrin - badge-generator](${badgeUrl})](${linkTarget})`
      );
    });
  });

  describe("#ghCounterBadge", () => {
    it("return a valid stars shield", () => {
      const badgeUrl =
        "https://img.shields.io/github/stars/MichaelCurrin/badge-generator?style=social";
      const linkTarget = "https://github.com/MichaelCurrin/badge-generator";

      expect(repoNoLicense.ghCounterBadge("stars")).toBe(
        `[![stars - badge-generator](${badgeUrl})](${linkTarget})`
      );
    });

    it("return a valid forks shield", () => {
      const badgeUrl =
        "https://img.shields.io/github/forks/MichaelCurrin/badge-generator?style=social";
      const linkTarget = "https://github.com/MichaelCurrin/badge-generator";

      expect(repoNoLicense.ghCounterBadge("forks")).toBe(
        `[![forks - badge-generator](${badgeUrl})](${linkTarget})`
      );
    });

    it("return a valid issues shield", () => {
      const badgeUrl =
        "https://img.shields.io/github/issues/MichaelCurrin/badge-generator";
      const linkTarget =
        "https://github.com/MichaelCurrin/badge-generator/issues";

      expect(repoNoLicense.ghCounterBadge("issues")).toBe(
        `[![issues - badge-generator](${badgeUrl})](${linkTarget})`
      );
    });
  });
});
