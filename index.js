/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.log('Yay, the app was loaded!')

  app.on('issues.opened', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
    const params = context.issue({ body: 'Thanks for opening this issue!' })

    // Post a comment on the issue
    return context.github.issues.createComment(params)
  })

  app.on('pull_request.assigned', async context => {
    console.log('pull request assigned,  context')
    app.log(context)
  })

  // app.on('pull_request.opened', async context => {
  app.on('pull_request.assigned', async context => {
    const regex = /(::pr_number::)/gi

    const pullRequestNumber = context.payload.pull_request.number
    const pullRequestDesription = context.payload.pull_request.body

    var newBody = pullRequestDesription.replace(regex, pullRequestNumber)
    const params = context.issue({ body: newBody })

    return context.github.issues.edit(params)
  })
}
