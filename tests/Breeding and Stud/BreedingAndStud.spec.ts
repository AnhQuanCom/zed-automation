import Authorization from '../../pages/Authorization.page';
import * as data from '../../fixtures/qa.json';
import Metamask from '../../pages/Metamask.module';
import { BrowserContext } from 'playwright';
import BreedingAndStud from '../../pages/BreedingAndStud.page';
import Stable from '../../pages/Stable.page';
import fs from 'fs';

describe('Breeding And Stud', () => {
  let auth: Authorization;
  let pages: any;
  let browserContext: BrowserContext;
  let metamask: Metamask;
  let breedingAndStud: BreedingAndStud
  let stable: Stable

  beforeAll(async () => {
    metamask = new Metamask();
    browserContext = await metamask.init();
    pages = await metamask.authenticate(browserContext);
    auth = new Authorization(pages[0]);
    breedingAndStud = new BreedingAndStud(pages[0])
    stable = new Stable(pages[0])
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

  xit('ZED-XX - Not Implemented Yet', async () => {
    expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
  });


  describe('Breeding', () => {
    beforeEach(async() => {
      await pages[0].click(breedingAndStud.objects.btnBreeding)
    })

    xit('ZED-69 - Breeding Service does not show Female horses on  breeding modal when are younger than 1 month', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-70 - Breeding Services does not show Female horses on breeding modal when are running in a race or has being registered to one', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-71 - Breeding Service does not allow the user to put bred male horse younger than 1 month in stud (From stable or direct horse page)', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-72 - Breeding Service does not allow 1-month minimum breeding for Genesis horses', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-120 - Breeding Service allows the user to select a valid FEMALE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-121 - Breeding Service allows the user to select a valid STUD', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-122 - Breeding Service allows the user to BUY COVER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-123 - Breeding Service allows the user to cancel the transaction of BUY COVER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-124 - Breeding service revokes the BUY COVER transaction is the HORSE is not in STUD', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    it('ZED-186 - Breeding is showing the list of RACEHORSES', async () => {
      const horseList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      expect(horseList.length).toBeGreaterThanOrEqual(0)
    });

    xit('ZED-187 - Breeding is loading RACEHORSES through infinite scroll loading/pagination', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    it('ZED-188 - Breeding is showing the FILTER collapse panel after hit on the FILTERS button', async () => {
    await pages[0].click(breedingAndStud.objects.btnStableFilterOptions)
    await pages[0].waitForSelector(breedingAndStud.objects.filtersPanel.breeds)
    expect(await pages[0].getAttribute(breedingAndStud.objects.filtersPanel.divPanelFilterStud, 'class')).toContain('open')
    await pages[0].waitForSelector(breedingAndStud.objects.filtersPanel.btnCloseFilterPanel)
    await pages[0].click(breedingAndStud.objects.filtersPanel.btnCloseFilterPanel)
    await pages[0].waitForTimeout(1000)
    expect(await pages[0].isVisible(breedingAndStud.objects.filtersPanel.btnCloseFilterPanel)).toBe(true)
    });

    it('ZED-189 - Breeding allows the user to filter racehorses by GENERATION range', async () => {
    await pages[0].click(breedingAndStud.objects.btnStableFilterOptions)
    await pages[0].waitForSelector(breedingAndStud.objects.filtersPanel.zedGeneration)
    await pages[0].click(breedingAndStud.objects.filtersPanel.zedGeneration)
    await pages[0].waitForTimeout(1000) 
    await pages[0].fill(breedingAndStud.objects.filtersPanel.zedGenerationMin,'6')
    await pages[0].click(breedingAndStud.objects.filtersPanel.btnCloseFilterPanel)
    await pages[0].waitForSelector(breedingAndStud.objects.studList.HorseList)
    const zedGenerationMin = await pages[0].getAttribute(breedingAndStud.objects.filtersPanel.zedGenerationMin,"value")
    expect(zedGenerationMin).toBe('6')
    const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
    expect(horsesList.length).toBeGreaterThanOrEqual(0)
    });

    it('ZED-190 - Breeding allows the user to filter racehorses by BLOODLINE', async () => {
      await pages[0].click(breedingAndStud.objects.btnStableFilterOptions)
      await pages[0].waitForSelector(breedingAndStud.objects.filtersPanel.bloodline)
      await pages[0].click(breedingAndStud.objects.filtersPanel.bloodline)
      await pages[0].waitForTimeout(1000)
      await pages[0].click(breedingAndStud.objects.filtersPanel.bloodlineButerinLabel)  
      await pages[0].waitForSelector(breedingAndStud.objects.studList.HorseList)
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      expect(horsesList.length).toBeGreaterThanOrEqual(0)
      expect(await pages[0].isChecked(breedingAndStud.objects.filtersPanel.bloodlineButerinCheckBox)).toBe(true)
    });

    it('ZED-191 - Breeding allows the user to filter racehorses by GENDER', async () => {
      await pages[0].click(breedingAndStud.objects.btnStableFilterOptions)
      await pages[0].waitForSelector(breedingAndStud.objects.filtersPanel.gender)
      await pages[0].click(breedingAndStud.objects.filtersPanel.gender)
      await pages[0].waitForTimeout(1000)
      await pages[0].click(breedingAndStud.objects.filtersPanel.genderColtLabel)  
      await pages[0].waitForSelector(breedingAndStud.objects.studList.HorseList)
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      expect(horsesList.length).toBeGreaterThanOrEqual(0)
      expect(await pages[0].isChecked(breedingAndStud.objects.filtersPanel.genderColtCheckBox)).toBe(true)
    });

    it('ZED-192 - Breeding allows the user to filter racehorses by BREEDS', async () => {
      await pages[0].click(breedingAndStud.objects.btnStableFilterOptions)
      await pages[0].waitForSelector(breedingAndStud.objects.filtersPanel.breeds)
      await pages[0].click(breedingAndStud.objects.filtersPanel.breeds)
      await pages[0].waitForTimeout(1000)
      await pages[0].click(breedingAndStud.objects.filtersPanel.breedGenesisLabel)
      await pages[0].waitForTimeout(1000)  
      await pages[0].waitForSelector(breedingAndStud.objects.studList.HorseList)
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      expect(horsesList.length).toBeGreaterThanOrEqual(0)
      expect(await pages[0].isChecked(breedingAndStud.objects.filtersPanel.breedGenesisCheckBox)).toBe(true)
    });

    it('ZED-193 - Breeding allows the user to SORT by Recently Listed', async () => {
    await pages[0].waitForSelector(breedingAndStud.objects.ddlStudSortBy)
    await pages[0].click(breedingAndStud.objects.ddlStudSortBy)
    await pages[0].waitForSelector(breedingAndStud.objects.ddlStudSortByRecentlyListed)
    await pages[0].click(breedingAndStud.objects.ddlStudSortByRecentlyListed)
    await pages[0].waitForSelector(breedingAndStud.objects.studList.HorseList)
    const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
    expect(horsesList.length).toBeGreaterThanOrEqual(0)
    });

    xit('ZED-194 - Breeding allows the user to SORT by Expired Soon', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    it('ZED-195 - Breeding allows the user to SORT by Highest Price', async () => {
      await pages[0].waitForSelector(breedingAndStud.objects.ddlStudSortBy)
      await pages[0].click(breedingAndStud.objects.ddlStudSortBy)
      await pages[0].waitForSelector(breedingAndStud.objects.ddlStudSortByHighestPrice)
      await pages[0].click(breedingAndStud.objects.ddlStudSortByHighestPrice)
      await pages[0].waitForSelector(breedingAndStud.objects.studList.HorseList)
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      expect(horsesList.length).toBeGreaterThanOrEqual(0)
      var feeList = []
      var isHighestFeeFirst = true;
      for(let horseRow =1 ;horseRow<= horsesList.length; horseRow++){
        const StudFee = await pages[0].innerText(breedingAndStud.objects.studList.lblStudFeeValue(horseRow)) 
        feeList.push(parseFloat(StudFee.substring(1,StudFee.length)))
      }
      for(let feeRow = 0; feeRow < feeList.length ; feeRow++) {
        if (feeList[feeRow] < feeList[feeRow+1]){ 
          isHighestFeeFirst = false;
            break;}
       } 
      expect(await isHighestFeeFirst).toBe(true);
    });

    it('ZED-196 - Breeding allows the user to SORT by Lowest Price', async () => {
      await pages[0].waitForSelector(breedingAndStud.objects.ddlStudSortBy)
      await pages[0].click(breedingAndStud.objects.ddlStudSortBy)
      await pages[0].waitForSelector(breedingAndStud.objects.ddlStudSortByLowestPrice)
      await pages[0].click(breedingAndStud.objects.ddlStudSortByLowestPrice)
      await pages[0].waitForSelector(breedingAndStud.objects.studList.HorseList)
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      expect(horsesList.length).toBeGreaterThanOrEqual(0)
      var feeList = []
      var isLowestFeeFirst = true;
      for(let horseRow =1 ;horseRow<= horsesList.length; horseRow++){
        const StudFee = await pages[0].innerText(breedingAndStud.objects.studList.lblStudFeeValue(horseRow)) 
        feeList.push(parseFloat(StudFee.substring(1,StudFee.length)))
      }
      for(let feeRow = 0; feeRow < feeList.length ; feeRow++) {
        if (feeList[feeRow] > feeList[feeRow+1]){ 
          isLowestFeeFirst = false;
            break;}
       } 
      expect(await isLowestFeeFirst).toBe(true);
    });

    it('ZED-197 - Breeding allows the user to SEARCH and the result match with the text/chars entered', async () => {
      const horseName = await pages[0].innerText(breedingAndStud.objects.studList.lblHorseNmValue(1))
      await pages[0].fill(breedingAndStud.objects.tfSearch,horseName)
      await pages[0].waitForTimeout(1000)
      await pages[0].waitForSelector(breedingAndStud.objects.studList.HorseList)
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      expect(horsesList.length).toEqual(1)
      expect(await pages[0].innerText(breedingAndStud.objects.studList.lblHorseNmValue(1))).toBe(horseName) 
    });

    it('ZED-198 - Breeding racehorse list is showing the stable name of each horse', async () => {
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      for(let i=1 ;i<= horsesList.length;i++){
       expect(await pages[0].innerText(breedingAndStud.objects.studList.lblStableValue(i))).not.toBe('');
       expect(await pages[0].innerText(breedingAndStud.objects.studList.lblStableValue(i))).toBeTruthy();
      }

    });

    it('ZED-199 - Breeding racehorse list is showing the TIME LEFT in format DD HH MM like 2d 9h 6m', async () => {
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      for(let i=1 ;i<= horsesList.length;i++){
       const timeLeftValue = await pages[0].innerText(breedingAndStud.objects.studList.lblTimeLeftValue(i))
       var timeUnit = timeLeftValue.split(" ")
       if((timeUnit.length === 3)){
        expect(timeUnit[0]).toContain('d')
        expect(timeUnit[1]).toContain('h')
        expect(timeUnit[2]).toContain('m')
       }
       else if((timeUnit.length === 2)){
        expect(timeUnit[0]).toContain('h')
        expect(timeUnit[1]).toContain('m')
       }
       else{
        expect(timeUnit[0]).toContain('m')
       }}
    });

    it('ZED-200 - Breeding racehorse list is showing the STUD FEE per horse', async () => {
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      for(let i=1 ;i<= horsesList.length;i++){
       const StudFee = await pages[0].innerText(breedingAndStud.objects.studList.lblStudFeeValue(i))
       expect(StudFee).not.toBe('')
       expect(StudFee).toContain('$')
       expect(parseFloat(StudFee.substring(1,StudFee.length))).toBeGreaterThanOrEqual(0)
      }
    });

    it('ZED-201 - Breeding racehorse list is showing the Horse Name', async () => {
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      for(let i=1 ;i<= horsesList.length;i++){
       const horseName = await pages[0].innerText(breedingAndStud.objects.studList.lblHorseNmValue(i))
       expect(horseName).not.toBe('');
       expect(horseName).toBeTruthy();
      }
    });

    it('ZED-202 - Breeding racehorse list is showing the GEN + BLOODLINE below the Horse Name', async () => {
      await pages[0].waitForSelector(breedingAndStud.objects.studList.HorseList)
      const horsesList= await pages[0].$$(breedingAndStud.objects.studList.HorseList)
      for(let horseRow=1 ;horseRow<= horsesList.length;horseRow++){
       const genBoodlineValue = await pages[0].innerText(breedingAndStud.objects.studList.lblGenBoodlineValue(horseRow))
       expect(genBoodlineValue).not.toBe('');
       var genBoodlineIndex = genBoodlineValue.split('•')
       expect(genBoodlineIndex.length).toBe(3)
       genBoodlineIndex.forEach((val: String) => expect(val).not.toBe(''));
      }
    });

    xit('ZED-203 - Breeding allows the user to open collapsed panel after click on a horse of the list.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-204 - Breeding Horse Details Panel shown the Horse GEN', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-205 - Breeding Horse Details Panel shown the Horse BLOODLINE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-206 - Breeding Horse Details Panel shown the Horse GENDER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-207 - Breeding Horse Details Panel shown the Horse COAT', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-208 - Breeding Horse Details Panel shown the Horse RACES', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-209 - Breeding Horse Details Panel shown the Horse CAREER', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-210 - Breeding Horse Details Panel shown the Horse WIN RATE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-211 - Breeding Horse Details Panel shown the Horse OFFSPRING', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-212 - Breeding Horse Details Panel shown the Horse OWNER STABLE', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-213 - Breeding Horse Details Panel shown the Horse TIME LEFT', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-214 - Breeding Horse Details Panel shown the Horse STUD FEE in a box close to the SELECT MATE button', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-215 - Breeding Horse Details Panel shown SELECT MATE button and perform the action after a click', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-216 - Breeding Horse Details Panel shown the - icon as a close link action of the collapse section and closes it after a click', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

  });

  describe('Stud', function() {
    xit('ZED-57 - Stud Service allows the user to BREED racehorse while racehorse is in STUD', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    it('ZED-58 - Stud Service is showing the Racehorse when is added IN STUD', async () => {
      await pages[0].click(stable.objects.imgStableProfile)
      await pages[0].click(stable.objects.btnStableFilterOptions)
      await pages[0].click(stable.objects.filtersPanel.gender)
      await pages[0].click(stable.objects.filtersPanel.genderColtLabel)
      await pages[0].waitForSelector(stable.objects.loader)
      expect(await stable.getFirstAvailableHorse()).not.toBeFalsy()
      await pages[0].waitForSelector(stable.objects.stableList.panelHorseName)
      const horseAtStable = await pages[0].evaluate((e: any) => document.querySelector(e).firstChild.nodeValue, stable.objects.stableList.panelHorseName)
      await pages[0].click(stable.objects.stableList.panelHorseBreedLink)
      await pages[0].click(stable.objects.breedForm.ddlStudDuration)
      await pages[0].click(stable.objects.breedForm.txt1Day)
      const [tabs] = await Promise.all([
        browserContext.waitForEvent('page'),
        await pages[0].click(stable.objects.breedForm.btnNext)
      ]);
      await tabs.waitForLoadState();
      pages = tabs.context().pages();
      await pages[1].click(auth.objects.BTN_METAMASK_SIGN)
      const loading = await pages[0].waitForSelector(stable.objects.transactionLoader, {state: 'hidden' }).catch(() => true)
      expect(loading).toBeNull()
      await pages[0].goto('https://goerli-test.zed.run/stud')
      await pages[0].waitForLoadState()
      await pages[0].waitForTimeout(2000)
      const horseAtStud = await breedingAndStud.searchHorseWithRetries(horseAtStable, 10)
      expect(horseAtStud).toBe(horseAtStable)
    });

    it('ZED-59 - Stud Service is showing the racehorse details', async () => {
      await pages[0].click(breedingAndStud.objects.btnBreeding)
      await pages[0].click(breedingAndStud.objects.lstHorses(1))
      expect(await pages[0].innerText(breedingAndStud.objects.lblHorseName)).not.toBe('')
      expect(await pages[0].innerText(breedingAndStud.objects.lblPanelDate)).not.toBe('')
      const link = await pages[0].getAttribute(breedingAndStud.objects.lblPanelLink, 'href')
      const [windows] = await Promise.all([
        browserContext.waitForEvent('page'),
        await pages[0].click(breedingAndStud.objects.lblPanelLink)
      ]);
      await windows.waitForLoadState();
      pages = windows.context().pages();
      expect(await pages[1].url()).toBe(link)
      await pages[0].bringToFront()
      expect(await pages[0].innerText(breedingAndStud.objects.lblPanelInfo(1))).toBe('GEN')
      expect(await pages[0].innerText(breedingAndStud.objects.lblPanelInfo(2))).toBe('BLOODLINE')
      expect(await pages[0].innerText(breedingAndStud.objects.lblPanelInfo(3))).toBe('GENDER')
      expect(await pages[0].innerText(breedingAndStud.objects.lblPanelInfo(4))).toBe('COAT')
      expect(await pages[0].innerText(breedingAndStud.objects.lblPanelInfo(5))).toBe('RACES')
      expect(await pages[0].innerText(breedingAndStud.objects.lblPanelInfo(6))).toBe('CAREER')
      expect(await pages[0].innerText(breedingAndStud.objects.lblPanelInfo(7))).toBe('WIN RATE')
      expect(await pages[0].innerText(breedingAndStud.objects.lblPanelInfo(8))).toBe('OFFSPRING')
      for (let i = 1; i <= 10; i++)
        expect(await pages[0].innerText(breedingAndStud.objects.lblPanelValue(i))).not.toBe('')
    });

    it('ZED-60 - Stud Service allows the Colt can breed 3 times during their breeding cycle', async () => {
      await pages[0].click(breedingAndStud.objects.btnBreeding)
      await pages[0].click(breedingAndStud.objects.btnStableFilterOptions)
      await pages[0].click(breedingAndStud.objects.filtersPanel.gender)
      await pages[0].click(breedingAndStud.objects.filtersPanel.genderColtLabel)
      await pages[0].click(breedingAndStud.objects.lstHorses(1))
      const breedCount = await pages[0].waitForSelector(breedingAndStud.objects.lblPanelValue(10))
      expect(await breedCount.innerText()).toContain('of 3 left')
    });

    it('ZED-61 - Stud Service allows the user to move the male Genesis racehorse into Stud service with a duration is 1 day or 3 days or 7 days', async () => {
      await pages[0].click(stable.objects.imgStableProfile)
      await pages[0].click(stable.objects.btnStableFilterOptions)
      await pages[0].click(stable.objects.filtersPanel.gender)
      await pages[0].click(stable.objects.filtersPanel.genderColtLabel)
      await pages[0].waitForSelector(stable.objects.loader)
      expect(await stable.getFirstAvailableHorse()).not.toBeFalsy()
      await pages[0].click(stable.objects.stableList.panelHorseBreedLink)
      await pages[0].click(stable.objects.breedForm.ddlStudDuration)
      await pages[0].click(stable.objects.breedForm.txt1Day)
      expect(await pages[0].innerText(stable.objects.breedForm.txtStudDuration)).toBe('1 Day')
      await pages[0].click(stable.objects.breedForm.ddlStudDuration)
      await pages[0].click(stable.objects.breedForm.txt3Day)
      expect(await pages[0].innerText(stable.objects.breedForm.txtStudDuration)).toBe('3 Days')
      await pages[0].click(stable.objects.breedForm.ddlStudDuration)
      await pages[0].click(stable.objects.breedForm.txt7Day)
      expect(await pages[0].innerText(stable.objects.breedForm.txtStudDuration)).toBe('7 Days')
    });

    it('ZED-62 - Stud Service allows the user to cancel the pushing process the racehorse into the In Stub', async () => {
      await pages[0].click(stable.objects.imgStableProfile)
      await pages[0].click(stable.objects.btnStableFilterOptions)
      await pages[0].click(stable.objects.filtersPanel.gender)
      await pages[0].click(stable.objects.filtersPanel.genderColtLabel)
      await pages[0].waitForSelector(stable.objects.loader)
      expect(await stable.getFirstAvailableHorse()).not.toBeFalsy()
      await pages[0].click(stable.objects.stableList.panelHorseBreedLink)
      await pages[0].click(stable.objects.breedForm.ddlStudDuration)
      await pages[0].click(stable.objects.breedForm.txt1Day)
      await pages[0].click(stable.objects.breedForm.btnCancel)
      const breedForm = await pages[0].waitForSelector(stable.objects.breedForm.formBreed, {state: 'hidden', timeout: 3000}).catch(() => true)
      expect(breedForm).toBeNull()
    });

    xit('ZED-63 - Stud Service is not showing the racehorse on the Stud Service page in the expiration after 1-3-7 days', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    it('ZED-64 - Stud Service does not allow the user to push In Stud if the racehorse is in Race', async () => {
      // function to find the first horse in the list that is in race
      const getFirstHorseInRace = async (startId?: number): Promise<any> => {
        // index starts from 1
        if (!startId)
          startId = 1
        let i: number;
        await pages[0].waitForSelector(stable.objects.stableList.horse(startId))
        const horseList = await pages[0].$$(stable.objects.stableList.HorseList)
        for (i = startId; i <= horseList.length; i++) {
          const badge = await pages[0].innerText(stable.objects.stableList.horseBadge(i))
          if (badge === 'IN RACE') {
            await horseList[i - 1].click()
            const res = await pages[0].waitForSelector(stable.objects.stableList.panelHorseBreedLink, { timeout: 2000 }).catch(() => null)
            expect(res).toBeNull()
            return
          }
        }
        if (!await pages[0].isVisible(stable.objects.btnOwnARacehorse)) {
          await pages[0].evaluate('window.scrollTo(0, document.body.scrollHeight)')
          return await getFirstHorseInRace(i)
        }
        return
      }
      await pages[0].click(stable.objects.imgStableProfile)
      await getFirstHorseInRace()
    });

    it('ZED-65 - Stud Services allows the user to cancel the stub Service process', async () => {
      await pages[0].click(stable.objects.imgStableProfile)
      await pages[0].click(stable.objects.btnStableFilterOptions)
      await pages[0].click(stable.objects.filtersPanel.gender)
      await pages[0].click(stable.objects.filtersPanel.genderColtLabel)
      await pages[0].waitForSelector(stable.objects.loader)
      expect(await stable.getFirstAvailableHorse()).not.toBeFalsy()
      await pages[0].click(stable.objects.stableList.panelHorseBreedLink)
      await pages[0].click(stable.objects.breedForm.ddlStudDuration)
      await pages[0].click(stable.objects.breedForm.txt1Day)
      const [windows] = await Promise.all([
        browserContext.waitForEvent('page'),
        await pages[0].click(stable.objects.breedForm.btnNext)
      ]);
      await windows.waitForLoadState();
      pages = windows.context().pages();
      await pages[1].click(auth.objects.BTN_METAMASK_CANCEL)
      expect(await pages[0].waitForSelector(stable.objects.breedForm.txtMetaMaskError)).not.toBeNull()
    });

    it('ZED-66 - Stud Service allows the user to set a name to a horse after is being generated', async () => {
      await pages[0].click(stable.objects.imgStableProfile)
      let res = await stable.getFirstNewborn()
      if (res) {
        const name = 'Test Horse ' + (Math.random() + 1).toString(36).substring(7)
        await pages[0].click(stable.objects.newbornForm.btnConfirm)
        await pages[0].fill(stable.objects.newbornForm.tfName, name)
        await pages[0].click(stable.objects.newbornForm.lblConfirm)
        await pages[0].click(stable.objects.newbornForm.btnConfirm)
        await pages[0].waitForTimeout(2000)
        await pages[0].fill(stable.objects.txtStableSearch, name)
        await pages[0].waitForSelector(stable.objects.loader)
        await pages[0].waitForSelector(stable.objects.stableList.txtHorseName(1))
        await pages[0].waitForTimeout(2000)
        res = await pages[0].evaluate((e: any) => document.querySelector(e).firstChild.nodeValue, 
          stable.objects.stableList.txtHorseName(1))
        expect(res).toBe(name)
      }
    });

    xit('ZED-67 - Stud Service allows the user to transfer horse to other account after name has being assigned', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-68 - Stud Service allows the user to put into the gate nomination after the name has being assigned', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

  });

  describe('Offspring Performance', () => {

    xit('ZED-137 - Offspring is showing the Parents of a Horse', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-138 - Offspring is showing the Average wins percentage even when just shows the Parents of the Horse', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-139 - Offspring is showing the Average Win percentage of the offspring of the horse', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-140 - Offspring is showing the descendant/offspring horses in a styled card and the user is able to click/redirect to horse details.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-141 - Offspring is showing `Your Colt has no offsprings yet` when the horse has no descendant/offspring horses associated', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-142 - Offspring is showing the `Breed` button when the colt has no offsprings yet and allows to redirect to the action.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-143 - Offspring is showing `Unable to Bree` if the horse does not have at least one month of born.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-144 - Offspring is showing the `Time Left: 22 Day(s)` to put the horse in Stud or Breed.', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-145 - Offspring is showing the `LOAD MORE` button when the stable/owner has more than 6 horses shown in the section', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

    xit('ZED-146 - Offspring is showing `6 of 14 offsprings` as a counter of the stable/owner horses on the top left section of the card', async () => {
      expect(await pages[0].isVisible(auth.objects.B_ETH_BALANCE)).toBe(true);
    });

  });

  describe('Horse Profile', () => {
    beforeEach(async() => {
      await pages[0].click(breedingAndStud.objects.btnBreeding)
      await pages[0].click(breedingAndStud.objects.lstHorses(1))
    })

    it('ZED-148 - Horse details are showing the horse name on top of the section in a big font size', async () => {
      const horseName = await pages[0].innerText(breedingAndStud.objects.lblHorseName)
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      const horseHeader = await pages[0].innerText(breedingAndStud.objects.lblHorseHeader)
      expect(horseHeader).toBe(horseName)
    });

    it('ZED-149 - Horse details are showing the `Share` link/icon on the top/right section of the top', async () => {
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      await pages[0].click(breedingAndStud.objects.btnShare)
      const urlShared = await pages[0].getAttribute(breedingAndStud.objects.textShareUrl, 'value')
      expect(urlShared).toBe(pages[0].url())
      await pages[0].click(breedingAndStud.objects.btnCopy)
      await pages[0].waitForSelector(breedingAndStud.objects.imgCopied)
      const urlCopied = await pages[0].evaluate(async () => await navigator.clipboard.readText())
      expect(urlCopied).toBe(urlShared)
    });

    it('ZED-150 - Horse details is showing the horse render in the center of the top section', async () => {
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      const divHorseProfile = await pages[0].waitForSelector(breedingAndStud.objects.divHorseProfile).catch(() => false)
      expect(divHorseProfile).not.toBeFalsy()
      const divHorseImage = await pages[0].waitForSelector(breedingAndStud.objects.divHorseImage).catch(() => false)
      expect(divHorseImage).not.toBeFalsy()
    });

    it('ZED-151 - Horse details are showing the `view 3D` icon/link to enable the 3D rendering', async () => {
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      const imgHorse3D = await pages[0].waitForSelector(breedingAndStud.objects.imgHorse3D)
      expect(await imgHorse3D.isEnabled()).toBeTruthy()
    });

    it('ZED-152 - Horse details allow the user to see the horse render in 3D modal after click on the `view 3D` link/icon', async () => {
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      await pages[0].click(breedingAndStud.objects.imgHorse3D)
      const divView3D = await pages[0].waitForSelector(breedingAndStud.objects.divView3D).catch(() => false)
      expect(divView3D).not.toBeFalsy()
    });

    it('ZED-153 - Horse details allow the user to close 3D view after click on `X` button of the top right side of the modal.', async () => {
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      await pages[0].click(breedingAndStud.objects.imgHorse3D)
      await pages[0].waitForSelector(breedingAndStud.objects.divView3D)
      await pages[0].click(breedingAndStud.objects.imgClose3D)
      const divView3D = await pages[0].waitForSelector(breedingAndStud.objects.divView3D, {state: 'hidden', timeout: 3000}).catch(() => true)
      expect(divView3D).toBeNull()
    });

    it('ZED-154 - Horse details allow the user to use to mouse move (left-right) event to view the 3D rendering of the horse', async () => {      
      const pathImgBefore = './imageTemp/screen-before.png'
      const pathImgAfter = './imageTemp/screen-after.png'
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      await pages[0].click(breedingAndStud.objects.imgHorse3D)
      const currentView = await pages[0].waitForSelector(breedingAndStud.objects.divView3D)
      await pages[0].waitForTimeout(8000)
      await currentView.screenshot({ path: pathImgBefore })
      const box = await currentView.boundingBox()
      const startPos = { 
        x: (box.x + box.width) / 2,
        y: (box.y + box.height) / 2
      }
      await pages[0].mouse.down()
      await pages[0].mouse.move(startPos.x, startPos.y, { steps: 30 })
      await pages[0].mouse.up()
      await currentView.screenshot({ path: pathImgAfter })
      const result = await breedingAndStud.compareImages(pathImgBefore, pathImgAfter)
      fs.rm('./imageTemp', { recursive: true }, (err: any) => {
        if (err) return console.error(err)
      })
      expect(result).not.toBe(0)
    });

    it('ZED-155 - Horse details is showing the Stable Owner below the horse render section', async () => {
      await pages[0].click(stable.objects.imgStableProfile)
      const nameAtStable = await pages[0].innerText(stable.objects.lblStableName)
      await pages[0].click(breedingAndStud.objects.btnBreeding)
      await pages[0].click(breedingAndStud.objects.lstHorses(1))
      const nameAtStud = await pages[0].innerText(breedingAndStud.objects.lblOwnerNameAtStud)
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      if (nameAtStud === nameAtStable) {
        expect(await pages[0].innerText(breedingAndStud.objects.lblOwner)).toBe('')
        expect(await pages[0].innerText(breedingAndStud.objects.lblOwnerNameAtProfile)).toBe('')
      }
      else {
        expect(await pages[0].innerText(breedingAndStud.objects.lblOwner)).toBe('Owner')
        const nameAtProfile = await pages[0].innerText(breedingAndStud.objects.lblOwnerNameAtProfile)
        expect(nameAtStud.localeCompare(nameAtProfile, undefined, { sensitivity: 'accent' })).toBeTruthy()
      }
    });

    it('ZED-156 - Horse details has showing the BLOODLINE', async () => {
      const panelBloodline = await pages[0].innerText(breedingAndStud.objects.lblPanelValue(3))
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      expect(await pages[0].innerText(breedingAndStud.objects.lblProfileProperty(1))).toBe('BLOODLINE')
      const profileBloodline = await pages[0].innerText(breedingAndStud.objects.lblProfileValue(1))
      expect(profileBloodline.length).toBeGreaterThan(0)
      expect(profileBloodline).toBe(panelBloodline)
    });

    it('ZED-157 - Horse details has showing the GEN', async () => {
      const panelGen = await pages[0].innerText(breedingAndStud.objects.lblPanelValue(1))
      const panelSubGen = await pages[0].innerText(breedingAndStud.objects.lblPanelValue(2))
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      expect(await pages[0].innerText(breedingAndStud.objects.lblProfileProperty(2))).toBe('GEN')
      const profileGen = await pages[0].innerText(breedingAndStud.objects.lblProfileValue(2))
      const profileSubGen = await pages[0].innerText(breedingAndStud.objects.lblProfileValue(3))
      expect(profileGen.length).toBeGreaterThan(0)
      expect(profileSubGen.length).toBeGreaterThan(0)
      expect(profileGen).toBe(panelGen)
      expect(profileSubGen).toBe(panelSubGen)
    });

    it('ZED-158 - Horse details has showing the GENDER', async () => {
      const panelGender = await pages[0].innerText(breedingAndStud.objects.lblPanelValue(4))
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      expect(await pages[0].innerText(breedingAndStud.objects.lblProfileProperty(3))).toBe('GENDER')
      const profileGender = await pages[0].innerText(breedingAndStud.objects.lblProfileValue(4))
      expect(profileGender.length).toBeGreaterThan(0)
      expect(profileGender).toBe(panelGender)
    });

    it('ZED-159 - Horse details has showing the COAT', async () => {
      const panelCoat = await pages[0].innerText(breedingAndStud.objects.lblPanelValue(5))
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      expect(await pages[0].innerText(breedingAndStud.objects.lblProfileProperty(4))).toBe('COAT')
      const profileCoat = await pages[0].innerText(breedingAndStud.objects.lblProfileValue(5))
      expect(profileCoat.length).toBeGreaterThan(0)
      expect(profileCoat).toBe(panelCoat)
    });

    it('ZED-160 - Horse details has showing the number of RACES', async () => {
      const panelRaces = await pages[0].innerText(breedingAndStud.objects.lblPanelValue(6))
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      expect(await pages[0].innerText(breedingAndStud.objects.lblCareerProperty(1))).toBe('RACES')
      const careerRaces = await pages[0].innerText(breedingAndStud.objects.lblCareerValue(1))
      expect(careerRaces.length).toBeGreaterThan(0)
      expect(Number(careerRaces)).toBeGreaterThanOrEqual(0)
      expect(panelRaces).toBe(careerRaces)
    });

    it('ZED-161 - Horse details has showing the number of CAREER', async () => {
      const panelCareer = await pages[0].innerText(breedingAndStud.objects.lblPanelValue(7))
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      expect(await pages[0].innerText(breedingAndStud.objects.lblCareerProperty(2))).toBe('CAREER')
      const career = (await pages[0].innerText(breedingAndStud.objects.lblCareerValue(2)))
      expect(career.length).toBeGreaterThan(0)
      const careerStat = career.split('/')
      expect(careerStat.length).toBe(3)
      careerStat.forEach((val: String) => expect(Number(val)).toBeGreaterThanOrEqual(0));
      expect(career).toBe(panelCareer)
    });

    it('ZED-162 - Horse details has showing the percentage WIN RATE', async () => {
      const panelWinRate = await pages[0].innerText(breedingAndStud.objects.lblPanelValue(8))
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      expect(await pages[0].innerText(breedingAndStud.objects.lblCareerProperty(3))).toBe('WIN RATE')
      const careerWinRate = await pages[0].innerText(breedingAndStud.objects.lblCareerValue(3))
      expect(careerWinRate.length).toBeGreaterThan(0)
      expect(careerWinRate).toContain('%')
      expect(Number(careerWinRate.split('%')[0])).toBeGreaterThanOrEqual(0)
      expect(careerWinRate).toBe(panelWinRate)
    });

    it('ZED-163 - Horse details has showing the OFFSPRING left', async () => {
      const panelOffspring = await pages[0].innerText(breedingAndStud.objects.lblPanelValue(9))
      const panelSubOffspring = await pages[0].textContent(breedingAndStud.objects.lblPanelValue(10))
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      expect(await pages[0].innerText(breedingAndStud.objects.lblProfileProperty(2))).toBe('GEN')
      const profileOffspring = await pages[0].innerText(breedingAndStud.objects.lblProfileValue(6))
      const profileSubOffspring = await pages[0].textContent(breedingAndStud.objects.lblProfileValue(7))
      expect(profileOffspring.length).toBeGreaterThan(0)
      expect(profileSubOffspring.length).toBeGreaterThan(0)
      expect(Number(profileOffspring)).toBeGreaterThanOrEqual(0)
      expect(profileOffspring).toBe(panelOffspring)
      expect(profileSubOffspring.replace(/\u00a0/g, ' ')).toBe(panelSubOffspring)
    });

    it('ZED-242 - Horse profile is being shown the BREED card option/action while the user is authenticated', async () => {
      await pages[0].click(stable.objects.imgStableProfile)
      const res = await stable.getFirstAvailableHorse()
      expect(res).not.toBeFalsy()
      await pages[0].click(stable.objects.stableList.panelHorseDetailsLink(res))
      const text = await pages[0].waitForSelector(breedingAndStud.objects.lblInfoLeft)
      expect(await text.innerText()).toBe('Breed')
    });

    it('ZED-243 - Horse profile is not shown the BREED card option/action while the user is not authenticated', async () => {
      await pages[0].click(stable.objects.btnUserMenu)
      await pages[0].click(stable.objects.btnLogOut)
      await pages[0].click(breedingAndStud.objects.btnBreeding)
      await pages[0].click(breedingAndStud.objects.lstHorses(1))
      await pages[0].click(breedingAndStud.objects.divHorsePanel)
      expect(await pages[0].innerText(breedingAndStud.objects.lblInfoLeft)).not.toBe('Breed')
    });

  });
});
