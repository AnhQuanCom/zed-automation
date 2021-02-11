const { MetamaskPage } = require("../../pages/MetamaskPage");
const { MetamaskFactory } = require("../../utils/browser/metamaskFactory");
const { LoginPage } = require("../../pages/LoginPage");
const {
  MetamaskNotificationPage,
} = require("../../pages/MetamaskNotification");
const { SEED_PHRASE, PASSWORD, CONFIRM_PASSWORD } = require("../../data/env");
const { PERCENT_DISCOUNT } = require("../../data/env");
const {
  CONNECT_METAMASK,
  AUTHENTICATE_BUTTON,
} = require("../../locators/ZedRun");
const { MarketplacePage } = require("../../pages/MarketplacePage");
const { HomePage } = require("../../pages/HomePage");
const test = require("jest-retries");

var metamaskFactory = new MetamaskFactory();
var metamaskPage;
var metamaskInstance;
var zedRunPage;
var newPageInstance;
var metamaskNotificationInstance;
var metamaskNotificationPage;
var otherMetamaskNotificationInstance;
var otherMetamaskNotificationPage;
var marketPlacePage;
var homePage;
var discountPrice;

beforeAll(async () => {
  await metamaskFactory.removeCache();
  metamaskInstance = await metamaskFactory.init();
});

describe("Use percent discount voucher to buy horse with card while logging in with Metamask", () => {
  test("Update metamask info", 1, async () => {
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

  test("Open ZedRun page and click Connnect Metamask", 1, async () => {
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

  test("Go to Marketplace and select first horse", 1, async () => {
    homePage = new HomePage(newPageInstance);
    await homePage.waitForBalanceInfoToBeShown();
    await homePage.clickOnMarketplaceLink();
    marketPlacePage = new MarketplacePage(newPageInstance);
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.clickOnAcceptButton();
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.mouseOverFirstHorse();
    await marketPlacePage.clickFirstHorsePreview();
    await marketPlacePage.waitForLoadState();
  });

  test("Apply the discount coupon : ANH_TEST", 1, async () => {
    await marketPlacePage.waitForLoadState();
    firstHorseName = await marketPlacePage.getHorseName();
    let originalPrice = await marketPlacePage.getHorsePrice();
    discountPrice = originalPrice * (1 - PERCENT_DISCOUNT.NET_VALUE);
    await marketPlacePage.clickOnDownwardArrow();
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.typeCoupon(PERCENT_DISCOUNT.CODE);
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.clickApplyButton();
    await marketPlacePage.waitForLoadState();
    await marketPlacePage.verifyDiscountLabel(PERCENT_DISCOUNT.VALUE);
    await marketPlacePage.verifyDiscountPrice(discountPrice.toString());
  });

  // test(
  //   "Process the checkout with banking account and check value",
  //   1,
  //   async () => {
  //       paymentPage = new PaymentPage(newPageInstance);
  //       await paymentPage.clickOnBuyWithCreditCardButton();
  //       await paymentPage.waitUntilPaymentFormPresent();
  //       await paymentPage.clickOnUseDifferentCardIfNeed();
  //       await paymentPage.typeCreditCardNumber(CARD_NUMBER);
  //       await paymentPage.typeCreditCardExpirationDate(CARD_EXPIRATION_DATE);
  //       await paymentPage.typeCreditCardCVC(CARD_CVC);
  //       await paymentPage.clickPayButton();
  //       await paymentPage.checkPaySuccessfulLabelPresent();
  //       await paymentPage.clickDoneButton();
  //   }
  // );

  // test("Verify that our order is processing", 3, async () => {
  //     activityPage = new ActivityPage(newPageInstance);
  //     await activityPage.waitForLoadState();
  //     await activityPage.checkIfStatementInfoCorrect(firstHorseName);
  // });

  // test("Check the detail payment", 3, async () => {
  //     activityPage = new ActivityPage(newPageInstance);
  //     await activityPage.mouseOverFirstStatementInfo();
  //     otherPageInstance = await metamaskFactory.clickNewPage(
  //       newPageInstance,
  //       VIEW_DETAILS_BUTTON
  //     );
  //     detailPage = new DetailPage(otherPageInstance);
  //     await detailPage.bringToFront();
  //     await detailPage.verifyTransactionInfo(firstHorseName);
  //     await detailPage.verifyChargeAmount(discountPrice.toString());
  // });
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