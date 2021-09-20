import {Page} from "playwright";

class Authorization {

    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    objects = {
        BTN_METAMASK_GET_STARTED: "//button[text()='Get Started']",
        BTN_METAMASK_IMPORT_WALLET: "//button[text()='Import wallet']",
        BTN_METAMASK_I_AGREE: "//button[text()='I Agree']",
        TEXT_AREA_METAMASK_PASSPHRASE: "[placeholder='Paste seed phrase from clipboard']",
        TXT_METAMASK_PASSWORD: "#password",
        TXT_METAMASK_PASSWORD_CONFIRM: "#confirm-password",
        CHECKBOX_METAMASK_AGREE: ".first-time-flow__terms",
        BTN_METAMASK_IMPORT: "//button[text()='Import']",
        BTN_METAMASK_ALL_DONE: "text='All Done'",
        BTN_METAMASK_CLOSE: "[title='Close']",
        BTN_METAMASK_NETWORK_NAME: ".network-name",
        BTN_METAMASK_CHOOSE_NETWORK: "text='Goerli Test Network'",
        BTN_METAMASK_NEXT: "text='Next'",
        BTN_METAMASK_CONNECT: "text='Connect'",
        BTN_METAMASK_SIGN: "text='Sign'",
        BTN_METAMASK_CONFIRM: "//button[text()='Confirm']",
        BTN_NAV_START: '#app .app-content .header-desktop .start-part button',
        BTN_MODAL_METAMASK_LOGIN: '#login-modal .login-options .metamask-login',
    }

    btnStart = async () => await this.page.$('#app .app-content .header-desktop .start-part button');


    btnGetStartedMetamask = async () => await this.page.waitForSelector('//button[text()=\'Get Started\']');

    async getPageTitle() {
        return await this.page.title();
    }

    async getPageUrl() {
        return this.page.url();
    }


}

export default Authorization
