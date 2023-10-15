import { test, expect } from '@playwright/test';

test.beforeAll(async ({request}) => {
  // Clear the database
  await request.post('http://localhost:3000/api/reset');
});


test('Create a new board with a list and cards', async (
  { page }) => {

  // Load the app
  await page.goto('http://localhost:3000/');

  // Create a board
  await page.locator('[data-cy="first-board"]').fill('Holidays');
  await page.locator('[data-cy="first-board"]').press('Enter');

  await expect(page.locator('[data-cy="board-title"]')).toHaveValue(
    'Holidays');

  await expect(page.locator('[data-cy="add-list-input"]')).toBeVisible();
  await expect(page.locator('[data-cy="list"]')).not.toBeVisible();

  // Create a new list
  await page.locator('[data-cy="add-list-input"]').fill('ToDo');
  await page.locator('[data-cy="add-list-input"]').press('Enter');

  await expect(page.locator('[data-cy="list-name"]')).toHaveValue(
    'ToDo');


  // Add cards to the list
  await page.getByText('Add another card').click();
  await page.locator('[data-cy="new-card-input"]').fill(
    'Reserve a plane ticket');
  await page.getByRole('button', { name: 'Add card' }).click();

  await page.locator('[data-cy="new-card-input"]').fill('Book a hotel')
  await page.getByRole('button', { name: 'Add card' }).click();

  await page.locator('[data-cy="new-card-input"]').fill('Pack my suitcase');
  await page.getByRole('button', { name: 'Add card' }).click();

  await expect(page.locator('[data-cy="card-text"]')).toHaveText(
    ['Reserve a plane ticket', 'Book a hotel', 'Pack my suitcase'])

  await page.locator('[data-cy="home"]').click()

  await expect(page.getByText('My Boards')).toBeVisible();
  await expect(page.getByText('Holidays')).toBeVisible();
});