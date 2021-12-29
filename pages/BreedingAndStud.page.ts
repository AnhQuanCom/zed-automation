import { Page } from 'playwright';

class BreedingAndStud {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  objects = {
    btnBreeding: 'text=\'BREEDING\'',
    lstHorses: (id?: Number) => id ? `.panel:nth-child(${id})` : '.panel',
    lblHorseName: '.panel.open .md-text',
    divHorsePanel: '.panel.open .panel-horse',
    lblOwnerNameAtStud: '.panel.open .green',
    lblPanelValue: (id: Number) => `(//div[@class='panel open']//div[@class='item']//*[contains(@class, 'primary-text')])[${id}]`,
    lblHorseHeader: '.d-flex.header-text',
    lblOwner: '.subheader-text > span',
    lblOwnerNameAtProfile: '.subheader-text > a',
    divHorseProfile: '.horse-profile_properties',
    divHorseImage: '.horse-profile_image',
    imgHorse3D: '.horse-inspector',
    imgClose3D: '.horse-inspector-modal .close-icon',
    divView3D: '.viewer-body',
    btnShare: '.share-btn',
    textShareUrl: '.share-url',
    btnCopy: '.copy-link',
    imgCopied: '.copy-link > img',
    lblProfileProperty: (id: Number) => `(//*[contains(@class, 'xs')])[${id}]`,
    lblProfileValue: (id: Number) => `((//*[contains(@class, 'xs')])//following-sibling::div/*)[${id}]`,
    lblCareerProperty: (id: Number) => `.career-property:nth-child(${id}) .overline-text`,
    lblCareerValue: (id: Number) => `.career-property:nth-child(${id}) .primary-text`,
    btnStableFilterOptions: '.filters-btn',
    stubList:{
      HorseCard: '//div[@class=\'panel\']',
      HorseList: '(//div[@role=\'tabpanel\'])',
      horseCard: '(//div[@class=\'label-content\'])[1]',
    },
    filtersPanel: {
      divPanelFilterStud: '//div[contains(@class,"sidebar-wrapper side-filter-wrapper")]',
      btnCloseFilterPanel:'//div[@class=\'title-wrapper\']//button[1]',
      breeds: '//span[text()=\'BREEDS\']',
    } ,
  };

  async getPageTitle() {
    return await this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }
}

export default BreedingAndStud;
