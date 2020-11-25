const Metamask = require('../../pages/Metamask')
const METAMASKCONFIG = require('../../locators/Metamask')

let metamaskPage
beforeAll(async () => {
  metamaskPage = await Metamask.init()
})

afterAll(async () => {
  await Metamask.close()
})

describe("Metamask", () => {
  it("register with metamask", async () => {
    await metamaskPage.click(METAMASKCONFIG.CLICK_FIRST_TIME_FLOW__BUTTON);
    await metamaskPage.click(METAMASKCONFIG.CLICK_FIRST_TIME_FLOW__BUTTON);
    await metamaskPage.click(METAMASKCONFIG.CLICK_PAGE_CONTAINER_FOOTER);
    await metamaskPage.fill(METAMASKCONFIG.FILL_TEXT_AREA_FILL_PASSPHASE, METAMASKCONFIG.SEED_PHASE)
    await metamaskPage.fill(METAMASKCONFIG.FILL_PASSWORD_INPUT, METAMASKCONFIG.PASSWORD)
    await metamaskPage.fill(METAMASKCONFIG.FILL_PASSWORD_CONFIRM_INPUT, METAMASKCONFIG.PASSWORD_CONFIRM)
    await metamaskPage.check(METAMASKCONFIG.CHECKBOX_AGREE, true)
    await metamaskPage.click(METAMASKCONFIG.CLICK_FIRST_TIME_FLOW__BUTTON)
    await metamaskPage.click(METAMASKCONFIG.CLICK_ALL_DONE)
    await metamaskPage.click(METAMASKCONFIG.CLICK_CLOSE)
    await metamaskPage.click(METAMASKCONFIG.CLICK_NETWORK_NAME)
    await metamaskPage.click(METAMASKCONFIG.CLICK_CHOOSE_NETWORK)
  })
})