module.exports = {
  resultsDir: 'tests/harness/test-results',
  reportDir: 'allure-report',
  categories: [
    {
      name: 'Product defect',
      matchedStatuses: ['failed'],
      traceRegex: '.*OutOfBoundsException.*',
    },
    {
      name: 'Test defect',
      matchedStatuses: ['broken'],
    },
    {
      name: 'Flaky test',
      matchedStatuses: ['skipped'],
    },
  ],
};
