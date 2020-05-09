/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.log('Yay, ::PR number replacer:: was loaded!')

  app.on('pull_request.opened', async context => {
    const prNumberRegex = /(::pr_number::)/gi

    const prNumber = context.payload.pull_request.number
    const prDescription = context.payload.pull_request.body

    var newBody = prDescription.replace(prNumberRegex, prNumber)
    const params = context.issue({ body: newBody })

    return context.github.issues.update(params)
  })
}
