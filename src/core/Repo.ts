/**
 * Repo badge module.
 */
import { genericBadge, markdownImageWithLink } from "./badges";
import {
  COLOR,
  DEFAULT_BRANCH,
  GITHUB_DOMAIN,
  GITHUB_IO,
  LICENSE,
  SHIELDS_API,
  STYLES,
  // eslint-disable-next-line prettier/prettier
  TEMPLATE_BADGE
} from "./constants";

export class Repo {
  constructor(public username: string, public repoName: string) {}

  private _isValid() {
    return this.username && this.repoName;
  }

  ghURL() {
    return `${GITHUB_DOMAIN}/${this.username}/${this.repoName}`;
  }

  ghPagesURL() {
    // Domain will get lower-cased by GH after a redirect so just make it lowercase now.
    // But preserve case for the comparison. Note Project page needs trailing forward slash
    // but User page is without.
    const ghDomain = `${this.username}.${GITHUB_IO}`,
      fullDomain = `https://${ghDomain.toLowerCase()}`;

    if (this.repoName === ghDomain) {
      return fullDomain;
    }

    return `${fullDomain}/${this.repoName}/`;
  }
  // TODO add variation that has a docs site for the text. And add custom text options.
  ghPagesBadge() {
    const label = "View site",
      message = "GH Pages",
      color = COLOR.Green,
      isLarge = true,
      target = this.ghPagesURL();

    return genericBadge(label, message, color, isLarge, target);
  }

  useThisTemplateBadge() {
    if (!this._isValid()) {
      return "";
    }
    const target = `${this.ghURL()}/generate`;

    return genericBadge(
      TEMPLATE_BADGE.LABEL,
      TEMPLATE_BADGE.MESSAGE,
      TEMPLATE_BADGE.COLOR,
      TEMPLATE_BADGE.IS_LARGE,
      target,
      TEMPLATE_BADGE.LOGO
    );
  }

  private _tagBadgeUrl(type: string) {
    const params = "?include_prereleases&sort=semver";

    return `${SHIELDS_API.GH}/${type}/${this.username}/${this.repoName}${params}`;
  }

  /**
   * Create badge that dynamically shows a tag or release and links to releases.
   *
   * TODO: move these to the docs and link from there. It is useful for maintaining built badges.
   *
   * The tag shield shows the latest tag. The shield badge shows the latest release,
   * which must be created by hand on the Releases tab of your repo. Therefore, showing
   * releases will be behind the latest tag. The release flow of your app and if you want
   * people to start using a tag without a release influences which badge makes sense to yu.
   *
   * Notes on setting of the badge params:
   * - It is best to always link to releases page, since all tags on are shown on that page
   *   but you get the benefit of the release titles.
   * - Including pre-released is done based on example on shields.io tool.
   *   If you have a releases before v1, they will not appear as missing unless you add the flag.
   *   The tags before v1 will show either way, but with the flag the alpha tags will show too,
   *   so you may not want the flag.
   * - Use semvar for natural sorting. The default is to sort by date, which means tags added to
   *   old commits can show up as the latest tag when you don't want them to.
   */
  tagBadge(isRelease = false) {
    if (!this._isValid()) {
      return "";
    }

    const type = isRelease ? "release" : "tag",
      title = `GitHub ${type}`,
      imgUrl = this._tagBadgeUrl(type);

    const target = `${this.ghURL()}/releases/`;

    return markdownImageWithLink(title, imgUrl, target);
  }

  _licenseTarget(localLicense: boolean) {
    if (localLicense) {
      return "#license";
    }
    const repoUrl = this.ghURL();

    return `${repoUrl}/blob/${DEFAULT_BRANCH}/LICENSE`;
  }

  licenseBadge(licenseType: string, localLicense = true) {
    if (!licenseType || !this._isValid()) {
      return "";
    }

    return genericBadge(
      LICENSE.LABEL,
      licenseType,
      LICENSE.COLOR,
      LICENSE.IS_LARGE,
      this._licenseTarget(localLicense)
    );
  }

  gh() {
    const label = this.username,
      message = this.repoName,
      color = COLOR.Default,
      isLarge = false,
      target = this.ghURL(),
      logo = "github",
      logoColor = "",
      onlyQueryParams = true;

    return genericBadge(
      label,
      message,
      color,
      isLarge,
      target,
      logo,
      logoColor,
      onlyQueryParams
    );
  }

  private _ghSocialShield(type: string) {
    return `${SHIELDS_API.GH}/${type}/${this.username}/${this.repoName}?style=${STYLES.SOCIAL}`;
  }

  /* Stars or forks counter */
  // TODO use enum for type.
  ghSocial(type: string, usePreLabel = false) {
    if (!type || !this._isValid()) {
      return "";
    }
    const preLabel = usePreLabel ? `${this.username}/${this.repoName} ` : "",
      shield = this._ghSocialShield(type),
      target = this.ghURL();

    return `[${preLabel}![${type} - ${this.repoName}](${shield})](${target})`;
  }
}
