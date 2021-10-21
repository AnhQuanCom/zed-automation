import Authorization from '../../pages/Authorization.page';
import Metamask from '../../pages/Metamask.module';
import Stable from '../../pages/Stable.page';
import * as data from '../../fixtures/qa.json';
import { BrowserContext } from 'playwright';

describe('Stable', () => {
  let auth: Authorization;
  let stable: Stable;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;

  beforeAll(async () => {
    metamask = new Metamask();
    browserContext = await metamask.init();
    pages = await metamask.authenticate(browserContext);
    auth = new Authorization(pages);
    stable = new Stable(pages);
  });

  beforeEach(async () => {
    await pages[0].goto(data.baseUrl);
    await pages[0].waitForLoadState();
  });

  afterAll(async () => {
    await pages[0].close();
    await browserContext.close();
    await metamask.close(pages, browserContext);
  });

  afterEach( async () => {
    console.log('After Each')
  })

  it('ZED-129 - Stable is allowing the user to navigate to Settings section', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(false);
  });

  xit('ZED-129 - Stable is allowing the user to navigate to Settings section', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-147 - Stable is allowing the user to go the Horse Details after a click on the horse card/link', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-164 - Stable allows the user to filter by BLOODLINE', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-165 - Stable allows the user to filter by GENDER', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-166 - Stable allows the user to filter BREEDS', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-167 - Stable allows the user to filter by ZED GENERATION range', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-168 - Stable allows the user to close the left-side filter panel', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-169 - Stable is shown the left-side filter panel after clicking on FILTERS', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-170 - Stable allows the user to SEARCH after type a value and the value match with the input entered', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-171 - Stable allows the user to SORT BY Date - Newest', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-172 - Stable allows the user to SORT BT date - oldest', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-173 - Stable shown the stable name', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-174 - Stable shown the profile/stable image', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-175 - Stable shown the stable description below the stable name', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-176 - Stable shown the list of horses that belong to the stable', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-177 - Stable allows the user to go to Horse details after a click on a listed horse', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-178 - Stable shown OWN A RACEHORSE button down below the stable horse list', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-179 - Stable allows the user to OWN a new horse and after that is being shown in the STABLE horse list', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-180 - Stable shown the NEW HORSE after the Breeding is born', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-181 - Stable shown the THOROUGHBREDS number', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-182 - Stable shown the TOTAL CAREER of that stable', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-183 - Stable shown the WIN RATE of the stable', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-184 - Stable allows/shown the COPY LINK STABLE next to the stable name', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  xit('ZED-185 - Stable shown/allows navigating to the SETTINGS using the icon shown into the stable name/description section of the screen', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });

  describe('Settings', function() {

    xit('ZED-128 - Stable Setting allows the user to navigate through the Tabs [General/Notifications/Advance]', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    describe('General', function() {

      xit('ZED-116 - Stable showing the horses that belong to a address after buy from the marketplace', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
      });

      xit('ZED-125 - Stable is allowing the user to update the stable picture/image', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
      });

      xit('ZED-117 - Stable is showing the list of horses that belongs to an address.', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
      });

      xit('ZED-126 - Stable/Account is allowing the user to add a new stable picture/image', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
      });

      xit('ZED-127 - Stable/Account is allowing the user to update the stable information', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
      });

      xit('ZED-118 - Stable allows the user to transfer a Horse to another stable/address', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
      });

      xit('ZED-119 - Stable is showing into the list the horse transferred from another address', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
      });

    });

    describe('Advanced', function() {

      xit('ZED-130 - Advanced Setting allows the user to get API Key', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
      });

    });

    describe('Notifications', function() {

      xit('ZED-131 - Notifications allow the user to enable and disable it', async () => {
        expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
      });

    });

  });

});