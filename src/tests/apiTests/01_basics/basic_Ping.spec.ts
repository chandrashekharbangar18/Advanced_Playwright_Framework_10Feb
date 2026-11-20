import {test, expect} from '@playwright/test';

test('@smoke ping request', async ({request}) => {

    const resData = await request.get('/ping'); 
    expect (resData.status()).toBe(201);

});
