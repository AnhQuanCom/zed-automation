const {MetamaskPage} = require("../../pages/MetamaskPage");
const {MetamaskFactory} = require("../../utils/browser/metamaskFactory");
const {LoginPage} = require("../../pages/LoginPage");
const {MetamaskNotificationPage} = require("../../pages/MetamaskNotification");
const {SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD, THRESHOLD, WAIT_TIME} = require("../../data/env");
const {HomePage} = require("../../pages/HomePage");
const {RacingPage} = require("../../pages/RacingPage");
const {PaymentPage} = require("../../pages/PaymentPage");
const test = require("jest-retries");
const {CONNECT_METAMASK, AUTHENTICATE_BUTTON} = require("../../locators/ZedRun");
const {ADD_RACE_CONFIRM_BUTTON} = require("../../locators/Payment");

let metamaskFactory;
let metamaskPage;
let metamaskInstance;
let zedRunPage;
let newPageInstance;
let metamaskNotificationInstance;
let metamaskNotificationPage;
let otherMetamaskNotificationInstance;
let otherMetamaskNotificationPage;
let homePage;
let racingPage;
let index;
let registeredHorseNo;
let totalNo;
let eventName;
var paymentPage;
var confirmMetamaskNotificationInstance;
var confirmMetamaskNotificationPage;

beforeAll(async () => {
    metamaskFactory = new MetamaskFactory();
    await metamaskFactory.removeCache();
    metamaskInstance = await metamaskFactory.init();
});
describe("Pick horses to gate and process Next to Run event", () => {
    test("Update metamask info", 3, async () => {
        metamaskPage = new MetamaskPage(metamaskInstance);
        await metamaskPage.clickOnGetStartedButton();
        await metamaskPage.clickOnImportWalletButton();
        await metamaskPage.clickOnIAgreeButton();
        await metamaskPage.typeSeedPhase(SEED_PHRASE);
        await metamaskPage.typeNewPassword(PASSWORD);
        await metamaskPage.typeConfirmPassword(CONFIRM_PASSWORD);
        await metamaskPage.checkTermsAndConditionCheckBox();
        await metamaskPage.clickImportButton();
        await metamaskPage.clickOnAllDoneButton();
        await metamaskPage.clickOnCloseButton();
        await metamaskPage.clickOnNetworkDropdown();
        await metamaskPage.clickOnGoerliNetwork();
    });

    test("Open ZedRun page and click Connect Metamask", async () => {
        newPageInstance = await metamaskFactory.newPage();
        zedRunPage = new LoginPage(newPageInstance);
        await zedRunPage.navigate();
        await zedRunPage.clickOnStartButton();

        metamaskNotificationInstance = await metamaskFactory.clickNewPage(
            newPageInstance,
            CONNECT_METAMASK
        );
        metamaskNotificationPage = new MetamaskNotificationPage(
            metamaskNotificationInstance
        );

        await metamaskNotificationPage.waitForLoadState();
        await metamaskNotificationPage.clickOnNextButton();
        await metamaskNotificationPage.clickOnConnectButton();
        await metamaskNotificationPage.waitForCloseEvent();

        otherMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
            newPageInstance,
            AUTHENTICATE_BUTTON
        );
        otherMetamaskNotificationPage = new MetamaskNotificationPage(
            otherMetamaskNotificationInstance
        );

        await otherMetamaskNotificationPage.waitForLoadState();
        await otherMetamaskNotificationPage.clickOnSignButton();
        await otherMetamaskNotificationPage.waitForCloseEvent();
    });

    test("Check that the ZED app is loading successfully", async () => {
        homePage = new HomePage(newPageInstance);
        // await homePage.checkIfAvatarPresent();
        await homePage.waitUntilBalanceShown();
        await homePage.clickOnAcceptButton();
    });

    test("Select a racehorses to add into the paid entry racing", async () => {
        await homePage.clickOnRacingLink();
        racingPage = new RacingPage(newPageInstance);
        await racingPage.selectFirstEntryHasFeeEvent();
        const numberGateOpening = await racingPage.getGateOpening();
        const getEventName = await racingPage.returnEventName();
        console.log('List of Gates are opening ', numberGateOpening);
        for (let i = 0; i < numberGateOpening.length; i++) {
            await racingPage.clickGateNumberAndSelectHorse(numberGateOpening[i]);
            await racingPage.waitForLoadState();
            let confirmMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
                newPageInstance,
                ADD_RACE_CONFIRM_BUTTON
            );
            confirmMetamaskNotificationPage = new MetamaskNotificationPage(
                confirmMetamaskNotificationInstance
            );
            await confirmMetamaskNotificationPage.waitForLoadState();
            await confirmMetamaskNotificationPage.clickOnSignButton();
            await confirmMetamaskNotificationPage.waitForCloseEvent();
        }
        await racingPage.waitForLoadState();
        await racingPage.validateRacingEventAfterInNextToRun(getEventName);
    });
});

afterAll(async (done) => {
    try {
        await metamaskFactory.close();
        done();
    } catch (error) {
        console.log(error);
        done();
    } finally {
        done();
    }
});