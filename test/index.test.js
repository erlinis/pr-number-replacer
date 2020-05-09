const nock = require('nock')
const AppUnderTest = require('..')
const { createProbot } = require('probot')

const pullRequestOpenedPayload = require('./fixtures/pull_request.opened')
const pullRequestUpdated = { body: 'This is a pretty simple change. PR #123' }

describe('My Probot app', () => {
  let probot

  beforeEach(() => {
    nock.disableNetConnect()
    probot = createProbot({ id: 1, cert: 'test', githubToken: 'test' })
    probot.load(AppUnderTest)
  })

  test('replaces the PR number placeholder when PR number', async () => {
  // Simulates requesting a github token
    nock('https://api.github.com')
      .post('/app/installations/2/access_tokens')
      .reply(200, { token: 'test' })

    nock('https://api.github.com')
      .patch('/repos/erlinis/testing-repo/issues/123', (body) => {
        expect(body).toMatchObject(pullRequestUpdated)
        return true
      })
      .reply(200)

    // Receive a webhook event
    await probot.receive({ name: 'pull_request', payload: pullRequestOpenedPayload })
  })

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect()
  })
})
