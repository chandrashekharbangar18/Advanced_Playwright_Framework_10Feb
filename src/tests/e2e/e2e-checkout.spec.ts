/**
 * End-to-end checkout flow:
 *   1. Log in as a standard user (standard_user / tta_secret).
 *   2. Navigate to the inventory page.
 *   3. Add the first item to the cart.
 *   4. Navigate to the cart page.
 *   5. From the cart, proceed through checkout step one and checkout step two.
 *   6. Enter the customer details and complete the order.
 */

import { test, expect } from '@fixtures/test-base';
import { DataGenerator } from '@utils/DataGenerator';
import { credentials } from '@config/credentials';
import { createLogger } from '@utils/logger';

const log = createLogger('e2e-checkout');

// First product card on the TTACart inventory page.
const FIRST_ITEM_ID = 'test-allthethings-tshirt-red';



test.describe('@P0 @Regression E2E @Checkout Checkout Feature', () => {
    // Step 1 — every test in this suite starts already logged in.
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        log.info(`Step 1: logging in as ${credentials.standardUser}`);
        await loginPage.open();
        await loginPage.loginAs(credentials.standardUser, credentials.password);
        await inventoryPage.assertLoaded();
    });

    test('completes a checkout successfully @e2e', async ({
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutStepTwoPage,
        checkoutCompletePage,
    }) => {
        await test.step('Add the first product to the cart', async () => {
            await inventoryPage.addToCart(FIRST_ITEM_ID);
            await inventoryPage.openCart();
            await cartPage.assertLoaded();
            await expect(await cartPage.rowCount()).toBe(1);
        });

        await test.step('Enter customer details and review the order', async () => {
            await cartPage.checkout();
            await checkoutStepOnePage.assertLoaded();
            await checkoutStepOnePage.fillGuest(DataGenerator.checkoutCustomer());
            await checkoutStepOnePage.continue();
            await checkoutStepTwoPage.assertLoaded();
        });

        await test.step('Place the order and verify confirmation', async () => {
            await checkoutStepTwoPage.finish();
            await checkoutCompletePage.assertOrderComplete();
        });
    });
});