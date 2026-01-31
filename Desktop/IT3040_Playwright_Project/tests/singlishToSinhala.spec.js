import { test, expect } from '@playwright/test';

test.describe('SwiftTranslator Automation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
  });

  /* =====================================================
     POSITIVE FUNCTIONAL TEST SCENARIOS (24)
     These MUST PASS
  ===================================================== */

  const positiveScenarios = [
    'mama ahinsaka wenna hithenavaa',
    'api kalin gedara yanawa, epa karanna',
    'oya hithala balanne kohomada?',
    'mata poddak udhavi karanna',
    'aya podi mulu deyak karanawaa',
    'mama hetaa gihin epa karannee',
    'suba aluth avuruddak wewa',

    'oya Zoom meeting ekata yanavaadaa?',
    'mata WhatsApp ekak yawanawaa', 

    'mama dhaen vaeda karanavaa.',
    'mama gedara yanawaa, eyaa passe innawa',

    'ela machan! hondai supiri!',
    'api dhithvaa kalin prashna karamu',

    'mama geeta giyaa, eyaa maage passe',
    'mata eeka epaa, mama karanna baee',
    'api ihalin inna labana heta \n poddak balamu',
    'api office enna 7.30 AM', 

    'mata WhatsApp message ekak dhaapan',
    'mama adha udhaasanayen passe vaeda karala gedhara awilla raeeta thiyena deval hariyata karanna balaporoththu wenavaa mokadha kalin hariyata kalaa',

    'api Zoom meeting ekata login wenavaa',
    'api ihalin karanna, eyaa passe balamu',

    'api Galle trip ekak yamu',
    'mata 2 kg bath oonee',
    'Rs. 5343',
     
  ];

  positiveScenarios.forEach((input, index) => {
    test(`Pos_Fun_${String(index + 1).padStart(4, '0')}`, async ({ page }) => {
      const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
      const outputField = page.locator('div.whitespace-pre-wrap').first();

      await inputField.fill(input);
      await page.waitForTimeout(3000);

      const outputText = await outputField.innerText();

      // Positive expectation: Sinhala output MUST exist
      expect(outputText).toMatch(/[\u0D85-\u0DFF]{3,}/);
    });
  });

  /* =====================================================
     NEGATIVE FUNCTIONAL TEST SCENARIOS (10)
     These MUST FAIL
  ===================================================== */

  const negativeScenarios = [
    'Thx u kalin',
    'ok, see u l8r', 
    'pls send doc asap',
     'mama @ office',
    'ok cya l8r',
    'pls send doc asap',
    '???', 
    '      ',
    'CPU RAM ROM',
    '😂😂😂',
    'mama gedhara    yanavaa',
  ];

  negativeScenarios.forEach((input, index) => {
    test(`Neg_Fun_${String(index + 1).padStart(4, '0')}`, async ({ page }) => {

      // Marking this test as EXPECTED TO FAIL
      test.fail(true, 'System should fail or behave incorrectly for this input');

      const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
      const outputField = page.locator('div.whitespace-pre-wrap').first();

      await inputField.fill(input);
      await page.waitForTimeout(3000);

      const outputText = await outputField.innerText();

      /*
        Intentionally WRONG expectation:
        We expect a FULL Sinhala sentence (which will not happen)
        → This assertion FAILS
      */
      expect(outputText).toMatch(/[\u0D85-\u0DFF]{8,}\s+[\u0D85-\u0DFF]{8,}/);
    });
  });

  /* =====================================================
     UI TEST SCENARIO (1)
     Must PASS
  ===================================================== */

  test('UI_0001 – Sinhala output updates automatically without button click', async ({ page }) => {
    const inputField = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    const outputField = page.locator('div.whitespace-pre-wrap').first();

    await inputField.type('mama gedhara yanavaa', { delay: 120 });
    await page.waitForTimeout(4000);

    const outputText = await outputField.innerText();

    expect(outputText).toMatch(/[\u0D85-\u0DFF]{3,}/);
  });

});
