import { Page } from 'playwright';

class BreedingAndStud {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnBreeding: 'text=\'BREEDING\'',
    tfSearch: '.search-input > .search',
    btnClearSearch: '.search-input .icn',
    lstHorses: (id?: Number) => id ? `.panel:nth-child(${id})` : '.panel',
    txtHorseName: (id: number) => `.panel:nth-child(${id}) .stud`,
    lblHorseName: '.panel.open .md-text',
    divHorsePanel: '.panel.open .panel-horse',
    lblOwnerNameAtStud: '.panel.open .green',
    lblPanelValue: (id: Number) => `(//div[@class='panel open']//div[@class='item']//*[contains(@class, 'primary-text')])[${id}]`,
    lblHorseHeader: '.d-flex.header-text',
    lblOwner: '.subheader-text > span',
    loader: '.loader-container',
    lblOwnerNameAtProfile: '.subheader-text > a',
    divHorseProfile: '.horse-profile_properties',
    divHorseImage: '.horse-profile_image',
    imgHorse3D: '.horse-inspector',
    imgClose3D: '.horse-inspector-modal .close-icon',
    divView3D: '.viewer-body',
    lblInfoLeft: '.other-infos  > .left .primary-text',
    btnShare: '.share-btn',
    textShareUrl: '.share-url',
    btnCopy: '.copy-link',
    imgCopied: '.copy-link > img',
    lblProfileProperty: (id: Number) => `(//*[contains(@class, 'xs')])[${id}]`,
    lblProfileValue: (id: Number) => `((//*[contains(@class, 'xs')])//following-sibling::div/*)[${id}]`,
    lblCareerProperty: (id: Number) => `.career-property:nth-child(${id}) .overline-text`,
    lblCareerValue: (id: Number) => `.career-property:nth-child(${id}) .primary-text`
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }
}

export default BreedingAndStud;
