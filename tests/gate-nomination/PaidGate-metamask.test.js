const { MetamaskPage } = require("../../pages/MetamaskPage");
const { MetamaskFactory } = require("../../utils/browser/metamaskFactory");
const { LoginPage } = require("../../pages/LoginPage");
const {
  MetamaskNotificationPage,
} = require("../../pages/MetamaskNotification");
const {
  FIRST_SEED_PHRASE,
  FIRST_PASSWORD,
  FIRST_CONFIRM_PASSWORD
} = require("../../data/env");
const { HomePage } = require("../../pages/HomePage");
const { RacingPage } = require("../../pages/RacingPage");
const test = require("jest-retries");
const { METAMASK_LOGIN, MAIL_LOGIN } = require("../../data/env");
const stringUtils = require("../../utils/api/stringUtils");
const {
  CONNECT_METAMASK,
  AUTHENTICATE_BUTTON,
} = require("../../locators/ZedRun");
const { ADD_RACE_CONFIRM_BUTTON } = require("../../locators/Payment");

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
var confirmMetamaskNotificationPage;
var confirmMetamaskNotificationInstance;
var zedRunApi = require("../../utils/api/zedApi");
var className;
var numberGateOpening;
var getEventName;

beforeAll(async () => {
  let token = await zedRunApi.login(
    METAMASK_LOGIN.PUBLIC_ADDRESS,
    METAMASK_LOGIN.SIGNED_MESSAGE
  );
  let array = await zedRunApi.checkIfUserHorsesEnoughForPaidRaces(
    token,
    METAMASK_LOGIN.PUBLIC_ADDRESS
  );
  className = await stringUtils.pickRandomValueFromStringArray(array);

  metamaskFactory = new MetamaskFactory();
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Paid racing with fee racing when logged by Meta Mask", () => {
  test("Get token", 3, async () => {
    console.log(className);
  });
  test("Update metamask info", 3, async () => {
    metamaskPage = new MetamaskPage(metamaskInstance);
    await metamaskPage.clickOnGetStartedButton();
    await metamaskPage.clickOnImportWalletButton();
    await metamaskPage.clickOnIAgreeButton();
    await metamaskPage.typeSeedPhase(FIRST_SEED_PHRASE);
    await metamaskPage.typeNewPassword(FIRST_PASSWORD);
    await metamaskPage.typeConfirmPassword(FIRST_CONFIRM_PASSWORD);
    await metamaskPage.checkTermsAndConditionCheckBox();
    await metamaskPage.clickImportButton();
    await metamaskPage.clickOnAllDoneButton();
    await metamaskPage.clickOnCloseButton();
    await metamaskPage.clickOnNetworkDropdown();
    await metamaskPage.clickOnGoerliNetwork();
  });

  test("Open ZedRun page and click Connect Metamask", async () => {
    newPageInstance = await metamaskFactory.newPage();
    console.log(">newPageInstance>>>");
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
    await metamaskNotificationPage.clickOnSignButton();
    await metamaskNotificationPage.waitForCloseEvent();
  });

  test("Check that the ZED app is loading successfully", async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.waitUntilBalanceShown();
    await homePage.clickOnAcceptButton();
  });

  test("Select a racehorses to add into the paid entry racing", async () => {
    await homePage.clickOnRacingLink();
    racingPage = new RacingPage(newPageInstance);
    // await racingPage.waitForLoadState();
    await racingPage.clickOnRacingClass(className);
    await racingPage.selectFirstEntryHasFeeEvent();
    numberGateOpening = await racingPage.getGateOpening();
    console.log("Gate opening ", numberGateOpening);
    getEventName = await racingPage.returnEventName();
    console.log("Selected event name ", getEventName);
  });

  test("Assign horse to paid races", async () => {
    await racingPage.waitForLoadState();
    // for (let i = 0; i < numberGateOpening.length; i++) {
    //   await racingPage.waitForLoadState();
    //   await racingPage.clickGateNumberAndSelectHorse(numberGateOpening[i]);
    //   await racingPage.waitForLoadState();
    //   confirmMetamaskNotificationInstance = await metamaskFactory.clickNewPage(
    //     newPageInstance,
    //     ADD_RACE_CONFIRM_BUTTON
    //   );
    //   confirmMetamaskNotificationPage = new MetamaskNotificationPage(
    //     confirmMetamaskNotificationInstance
    //   );
    //   await confirmMetamaskNotificationPage.waitForLoadState();
    //   await confirmMetamaskNotificationPage.clickOnSignButton();
    //   await confirmMetamaskNotificationPage.waitForCloseEvent();
    // }
    // await racingPage.waitForLoadState();
    // await racingPage.validateRacingEventAfterInNextToRun(getEventName);
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